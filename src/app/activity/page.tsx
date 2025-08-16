// app/activity/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import ActivityCard, { Activity } from "@/components/ActivityCard"; // Use the new component
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const Page = () => {
	const supabase = createClient();
	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				// 1. Get the current authenticated user
				const {
					data: { user },
				} = await supabase.auth.getUser();
				if (!user) throw new Error("User not authenticated.");

				// 2. Fetch the user's profile information
				const { data: profile, error: profileError } = await supabase
					.from("user_profiles")
					.select("firstName, lastName, profilePictureUrl")
					.eq("id", user.id)
					.single();

				if (profileError) throw new Error("Could not fetch user profile.");

				// 3. Fetch all postings by this user
				const { data: postings, error: postingsError } = await supabase
					.from("Posting")
					.select("id, createdAt, title, description, status")
					.eq("authorId", user.id);

				if (postingsError) throw postingsError;

				// 4. Fetch all reviews written by this user
				const { data: reviews, error: reviewsError } = await supabase
					.from("reviews")
					.select("id, createdAt, rating, comment")
					.eq("reviewerId", user.id);

				if (reviewsError) throw reviewsError;

				// 5. Format and combine the two data sources
				const formattedPostings: Activity[] =
					postings?.map((p) => ({
						...p,
						type: "posting",
						user: profile,
					})) || [];

				const formattedReviews: Activity[] =
					reviews?.map((r) => ({
						...r,
						type: "review",
						user: profile,
					})) || [];

				const combinedActivities = [...formattedPostings, ...formattedReviews];

				// 6. Sort the combined list by date, most recent first
				combinedActivities.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
				);

				setActivities(combinedActivities);
			} catch (err: any) {
				console.error("Error fetching activities:", err);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchActivities();
	}, [supabase]);

	return (
		<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
			<div className="mx-auto max-w-2xl">
				<h1 className="mb-6 text-3xl font-bold text-gray-800">Activity</h1>

				{loading && <p>Loading activity...</p>}
				{error && <p className="text-red-500">Error: {error}</p>}

				{!loading && !error && (
					<div className="space-y-4">
						{activities.length > 0 ? (
							activities.map((activity) => (
								<ActivityCard key={`${activity.type}-${activity.id}`} activity={activity} />
							))
						) : (
							<p className="text-gray-500">No activity to show yet.</p>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Page;
