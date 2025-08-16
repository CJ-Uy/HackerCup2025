// src/components/ActivityCard.tsx
import React from "react";
import Image from "next/image";
import { Plug, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Define the types for the data we expect.
// This helps with TypeScript and auto-completion.
type UserProfile = {
	firstName: string | null;
	lastName: string | null;
	profilePictureUrl: string | null;
};

export type Activity = {
	id: string;
	createdAt: string;
	user: UserProfile;
} & (
	| {
			type: "posting";
			title: string;
			description: string;
			status: string;
	  }
	| {
			type: "review";
			comment: string;
			rating: number;
	  }
);

// A small helper component to render the star rating
const StarRating = ({ rating }: { rating: number }) => {
	const totalStars = 5;
	return (
		<div className="flex items-center">
			{[...Array(totalStars)].map((_, index) => {
				const starValue = index + 1;
				return (
					<Star
						key={index}
						className={`h-4 w-4 ${
							starValue <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
						}`}
					/>
				);
			})}
		</div>
	);
};

// Card for 'Posting' type activities
const PostingCard = ({ activity }: { activity: Extract<Activity, { type: "posting" }> }) => {
	return (
		<div className="relative">
			<div className="flex items-start gap-4">
				<div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
					<Plug className="h-6 w-6 text-blue-500" />
				</div>
				<div className="flex-1">
					<h2 className="font-semibold text-gray-800">{activity.title}</h2>
					<p className="text-sm text-gray-500">
						by {activity.user.firstName} {activity.user.lastName}
					</p>
					<p className="mt-2 truncate text-sm text-gray-600">{activity.description}</p>
				</div>
				<div className="flex-shrink-0 text-xs text-gray-400">
					{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
				</div>
			</div>
			{activity.status === "Cancelled" && (
				<div className="absolute right-0 bottom-0">
					<span className="font-semibold text-red-600">Cancelled</span>
				</div>
			)}
		</div>
	);
};

// Card for 'Review' type activities
const ReviewCard = ({ activity }: { activity: Extract<Activity, { type: "review" }> }) => {
	return (
		<div className="flex items-start gap-4">
			<Image
				src={activity.user.profilePictureUrl || "/default-avatar.png"} // Provide a path to a default avatar
				alt="Profile picture"
				width={40}
				height={40}
				className="rounded-full"
			/>
			<div className="flex-1">
				<h2 className="font-semibold text-gray-800">
					{activity.user.firstName} {activity.user.lastName}
				</h2>
				<StarRating rating={activity.rating} />
				<p className="mt-2 text-sm text-gray-600">{activity.comment}</p>
			</div>
			<div className="flex-shrink-0 text-xs text-gray-400">
				{formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
			</div>
		</div>
	);
};

const ActivityCard = ({ activity }: { activity: Activity }) => {
	return (
		<div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
			{activity.type === "posting" ? (
				<PostingCard activity={activity} />
			) : (
				<ReviewCard activity={activity} />
			)}
		</div>
	);
};

export default ActivityCard;
