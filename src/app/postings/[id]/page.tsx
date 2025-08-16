// app/postings/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PartnerCard, { Partner } from "@/components/PartnerCard";
import ImportantNotification from "@/components/ImportantNotification"; // <-- IMPORT UPDATED

// --- FAKE DATA FOR DEMO PURPOSES ---
const FAKE_PARTNERS: Partner[] = [
	{
		bidId: "bid_1",
		partnerProfileId: "partner_123",
		name: "Charles Uy",
		avatarUrl: "/charles.jpg",
		rating: 3.0,
		skills: ["Electrician"],
		address: "Quezon City",
		certifications: ["Trust Me Bro"],
		charge: 100,
	},
	{
		bidId: "bid_3",
		partnerProfileId: "partner_789",
		name: "Niles Cabrera",
		avatarUrl: "/niles.jpg",
		rating: 4.9,
		skills: ["Electrician"],
		address: "Makati City",
		certifications: ["Master Electrician"],
		charge: 750,
	},
];

const MatchedPartnersPage = ({ params }: { params: { id: string } }) => {
	const router = useRouter();
	const postId = params.id;

	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPicking, setIsPicking] = useState(false);

	// State for the notification
	const [notification, setNotification] = useState({
		show: false,
		message: "",
	});

	// Simulate fetching data
	useEffect(() => {
		setTimeout(() => {
			setPartners(FAKE_PARTNERS);
			setLoading(false);
		}, 1000);
	}, []);

	// The function to handle picking a partner
	const handlePickPartner = async (bidId: string, partnerName: string) => {
		setIsPicking(true);
		const confirmed = window.confirm(`Are you sure you want to pick ${partnerName} for this job?`);

		if (confirmed) {
			// Simulate API call delay
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Show the success notification
			setNotification({
				show: true,
				message: `We have notified ${partnerName}, expect them to contact you soon!`,
			});

			// Wait a few seconds, then redirect
			setTimeout(() => {
				router.push("/");
			}, 2000);
		} else {
			setIsPicking(false);
		}
	};

	return (
		<>
			{/* RENDER THE RENAMED COMPONENT */}
			<ImportantNotification // <-- USAGE UPDATED
				show={notification.show}
				message={notification.message}
				onClose={() => setNotification({ show: false, message: "" })}
			/>

			<div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
				<div className="mx-auto max-w-md">
					<h1 className="mb-6 text-3xl font-bold" style={{ color: "#203963" }}>
						Matched Partners for You
					</h1>

					{loading && <div className="p-8 text-center text-gray-500">Loading partners...</div>}

					{!loading && (
						<div className="space-y-4">
							{partners.length > 0 ? (
								partners.map((partner) => (
									<PartnerCard
										key={partner.bidId}
										partner={partner}
										onPick={handlePickPartner}
										isPicking={isPicking}
									/>
								))
							) : (
								<div className="rounded-lg bg-white p-8 text-center shadow-sm">
									<h3 className="text-xl font-semibold">No Bids Yet</h3>
									<p className="mt-2 text-gray-500">
										Check back later to see partners who have bid on your post.
									</p>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default MatchedPartnersPage;
