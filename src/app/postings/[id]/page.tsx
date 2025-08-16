// app/postings/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PartnerCard, { Partner } from "@/components/PartnerCard";

// --- FAKE DATA FOR DEMO PURPOSES ---
// In a real app, this data would be fetched from Supabase.
const FAKE_PARTNERS: Partner[] = [
	{
		bidId: "bid_1",
		partnerProfileId: "partner_123",
		name: "Charles Uy",
		avatarUrl: "/charles.jpg", // Make sure this image exists in your /public folder
		rating: 4.5,
		skills: ["Electrician"],
		address: "Quezon City",
		certifications: ["TESDA Certified"],
		charge: 600,
	},
	{
		bidId: "bid_2",
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
	const postId = params.id; // We can use this ID for the real fetch later

	const [partners, setPartners] = useState<Partner[]>([]);
	const [loading, setLoading] = useState(true);
	const [isPicking, setIsPicking] = useState(false);

	// Simulate fetching data when the component mounts
	useEffect(() => {
		console.log(`Fetching partners for posting ID: ${postId}`);
		// Simulate a network delay
		setTimeout(() => {
			setPartners(FAKE_PARTNERS);
			setLoading(false);
		}, 1000); // 1 second delay
	}, [postId]);

	const handlePickPartner = async (bidId: string, partnerName: string) => {
		setIsPicking(true);
		const confirmed = window.confirm(`Are you sure you want to pick ${partnerName} for this job?`);

		if (confirmed) {
			console.log(`Picking partner with bid ID: ${bidId} for post: ${postId}`);

			// --- REAL SUPABASE LOGIC (COMMENTED OUT FOR DEMO) ---
			// const supabase = createClient();
			// const { error } = await supabase
			//   .from('Posting')
			//   .update({ acceptedBidId: bidId, status: 'In Progress' })
			//   .eq('id', postId);

			// if (error) {
			//   alert(`Failed to pick partner: ${error.message}`);
			// } else {
			//   alert(`${partnerName} has been selected! Redirecting...`);
			//   router.push('/activity');
			// }

			// --- FAKE LOGIC FOR DEMO ---
			await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
			alert(`${partnerName} has been selected! You would now be redirected.`);
			// router.push('/activity'); // Uncomment to enable redirection after picking
		}

		setIsPicking(false);
	};

	return (
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
	);
};

export default MatchedPartnersPage;
