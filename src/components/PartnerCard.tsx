// src/components/PartnerCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { Heart, MapPin, ShieldCheck, Zap } from "lucide-react";
import { StarRating } from "./ActivityCard"; // Import our re-usable star rating component

// Define the shape of the partner data we expect
export type Partner = {
	bidId: string;
	partnerProfileId: string;
	name: string;
	avatarUrl: string;
	rating: number;
	skills: string[];
	certifications: string[];
	address: string;
	charge: number;
};

interface PartnerCardProps {
	partner: Partner;
	onPick: (bidId: string, partnerName: string) => void;
	isPicking: boolean;
}

const PartnerCard = ({ partner, onPick, isPicking }: PartnerCardProps) => {
	return (
		<div className="w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
			<div className="flex gap-4">
				{/* Left Side: Image */}
				<div className="flex-shrink-0">
					<Image
						src={partner.avatarUrl}
						alt={`Profile of ${partner.name}`}
						width={100}
						height={120}
						className="h-full w-24 rounded-lg object-cover"
					/>
				</div>

				{/* Right Side: Details */}
				<div className="flex flex-1 flex-col">
					<div className="flex items-start justify-between">
						<div>
							<h3 className="text-lg font-bold text-gray-900">{partner.name}</h3>
							<StarRating rating={partner.rating} />
						</div>
						<button className="text-gray-400 transition-colors hover:text-red-500">
							<Heart size={24} />
						</button>
					</div>

					<div className="mt-3 space-y-1 text-sm text-gray-700">
						<div className="flex items-center gap-2">
							<Zap className="h-4 w-4 text-blue-600" />
							<span>{partner.skills.join(", ")}</span>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="h-4 w-4 text-blue-600" />
							<span>{partner.address}</span>
						</div>
						<div className="flex items-center gap-2">
							<ShieldCheck className="h-4 w-4 text-blue-600" />
							<span>{partner.certifications.join(", ")}</span>
						</div>
					</div>

					<p className="mt-2 font-semibold text-gray-800">Charges: ₱{partner.charge}</p>

					<div className="mt-auto flex gap-3 pt-3">
						<button
							onClick={() => onPick(partner.bidId, partner.name)}
							disabled={isPicking}
							className="flex-1 rounded-full bg-blue-900 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-400"
						>
							{isPicking ? "Picking..." : "Pick"}
						</button>
						<button className="flex-1 rounded-full border border-blue-900 px-4 py-2 font-semibold text-blue-900 transition-colors hover:bg-blue-50">
							View Profile
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PartnerCard;
