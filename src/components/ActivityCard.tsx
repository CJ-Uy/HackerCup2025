// src/components/ActivityCard.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plug, Star } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// --- Type Definitions ---
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

// --- Reusable Star Rating Component ---
const StarRating = ({ rating, totalStars = 5 }: { rating: number; totalStars?: number }) => {
	return (
		<div className="flex items-center">
			{[...Array(totalStars)].map((_, index) => {
				const starValue = index + 1;
				return (
					<Star
						key={index}
						className={`h-4 w-4 ${
							starValue <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
						}`}
					/>
				);
			})}
		</div>
	);
};

// --- Card for 'Posting' type activities ---
const PostingCard = ({ activity }: { activity: Extract<Activity, { type: "posting" }> }) => {
	const isClickable = activity.status !== "Cancelled";

	const cardContent = (
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
				<div className="absolute right-0 bottom-[-4px]">
					<span className="text-sm font-semibold text-red-600">Cancelled</span>
				</div>
			)}
		</div>
	);

	return isClickable ? (
		<Link href={`/postings/${activity.id}`} className="block">
			{cardContent}
		</Link>
	) : (
		<div>{cardContent}</div>
	);
};

// --- Card for 'Review' type activities ---
const ReviewCard = ({ activity }: { activity: Extract<Activity, { type: "review" }> }) => {
	return (
		<div className="flex items-start gap-4">
			<Image
				src={activity.user.profilePictureUrl || "/default-avatar.png"}
				alt="Profile picture"
				width={40}
				height={40}
				className="rounded-full object-cover"
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

// --- Main Activity Card Component ---
const ActivityCard = ({ activity }: { activity: Activity }) => {
	const isClickable = activity.type === "posting" && activity.status !== "Cancelled";

	return (
		<div
			className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow ${isClickable ? "cursor-pointer hover:shadow-md" : "opacity-70"}`}
		>
			{activity.type === "posting" ? (
				<PostingCard activity={activity} />
			) : (
				<ReviewCard activity={activity} />
			)}
		</div>
	);
};

export default ActivityCard;
export { StarRating }; // Export for use in PartnerCard
