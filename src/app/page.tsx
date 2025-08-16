"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import JobTitles from "@/components/JobTitles";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useEffect } from "react"; // 1. Import useEffect
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";
import { Session } from "@supabase/supabase-js"; // Optional: for type safety

const partners = [
	{
		id: 1,
		name: "Juan Dela Cruz",
		profession: "Plumber",
		rating: 4.5,
		location: "Quezon City",
		imageUrl: "/plumber.jpg",
	},
	{
		id: 2,
		name: "Maria Santos",
		profession: "Electrician",
		rating: 4.8,
		location: "Makati",
		imageUrl: "/electrician.jpg",
	},
	{
		id: 3,
		name: "Pedro Reyes",
		profession: "Tutor",
		rating: 4.7,
		location: "Pasig",
		imageUrl: "/tutor.jpg",
	},
];

const favoritePartners = [
	{
		id: 1,
		name: "Carlos Garcia",
		profession: "Carpenter",
		rating: 4.9,
		location: "Manila",
		imageUrl: "/carpenter.jpg",
		rate: "500/hr",
	},
	{
		id: 2,
		name: "Ana Lopez",
		profession: "House Cleaner",
		rating: 4.6,
		location: "Taguig",
		imageUrl: "/cleaner.jpg",
		rate: "350/hr",
	},
];

const PartnerCard = ({
	name,
	profession,
	rating,
	location,
	imageUrl,
}: {
	name: string;
	profession: string;
	rating: number;
	location: string;
	imageUrl: string;
}) => {
	return (
		<div className="flex gap-3 rounded-lg bg-white p-3 shadow-md">
			<Image src={imageUrl} alt={name} width={80} height={80} className="rounded-lg object-cover" />
			<div>
				<h3 className="font-semibold">{name}</h3>
				<p className="text-sm text-gray-600">{profession}</p>
				<p className="text-sm">⭐ {rating}</p>
				<p className="text-xs text-gray-500">{location}</p>
			</div>
		</div>
	);
};

const MinimalFavoriteCard = ({
	name,
	profession,
	rating,
	location,
	imageUrl,
	rate,
}: {
	name: string;
	profession: string;
	rating: number;
	location: string;
	imageUrl: string;
	rate: string;
}) => {
	return (
		<div className="w-40 flex-shrink-0 rounded-lg bg-white shadow-md">
			<Image
				src={imageUrl}
				alt={name}
				width={150}
				height={75}
				className="h-24 w-full rounded-t-lg object-cover"
			/>
			<div className="p-2">
				<p className="truncate text-sm font-medium">{name}</p>
				<p className="text-xs text-gray-500">{profession}</p>
				<p className="text-lg font-semibold text-blue-600">₱{rate}</p>
			</div>
		</div>
	);
};

export default function Page() {
	const [search, setSearch] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const router = useRouter();

	// 2. Add state to hold the session and a loading state
	const [session, setSession] = useState<Session | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const supabase = createClient();

	// 3. Use useEffect to check the auth state on component load
	useEffect(() => {
		// This listener is called immediately with the current session
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setIsLoading(false); // We now know the auth state, so stop loading
		});

		// Cleanup the listener when the component unmounts
		return () => {
			subscription.unsubscribe();
		};
	}, [supabase.auth]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Searching for:", searchQuery);
	};

	return (
		<div className="space-y-2 p-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-row items-center gap-x-3">
					<Image src="/logo.svg" width={50} height={50} alt="logo"></Image>
					<h1 className="text-2xl font-semibold text-[#1B365D]">KLUTCH</h1>
				</div>

				{/* Conditionally render the button based on the session state */}
				{isLoading ? (
					// Show a disabled or placeholder button while checking auth
					<Button variant="outline" className="border font-semibold" disabled>
						...
					</Button>
				) : session ? (
					// User is LOGGED IN
					<Button
						onClick={() => router.push("/partner-onboarding")}
						variant="outline"
						className="border font-semibold"
					>
						Become a Partner <FaArrowRight className="mt-0.5 size-3" />
					</Button>
				) : (
					// User is LOGGED OUT
					<Button
						onClick={() => setIsAuthModalOpen(true)}
						variant="outline"
						className="border font-semibold"
					>
						Login
					</Button>
				)}
			</div>

			<div className="flex items-center justify-between gap-2 py-5">
				<form onSubmit={handleSearch} className="w-full">
					<div className="relative">
						<CiSearch className="absolute top-1/2 left-4 size-5 -translate-y-1/2 transform text-[#1B365D]/50" />
						<input
							type="text"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="What do you need?"
							className="w-full rounded-full border border-[#1B365D]/50 py-3 pr-4 pl-12 text-sm placeholder-[#1B365D]/50 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
						/>
					</div>
				</form>

				<div className="rounded-full border border-[#1B365D]/50 p-3">
					<FaMapMarkerAlt className="size-6" color="#1B365D" />
				</div>
			</div>

			<JobTitles />

			{/* Favorite Partners */}
			<section>
				<div className="mb-2 flex items-center justify-between">
					<h2 className="text-lg font-semibold">Your Favorites</h2>
					<ChevronRight className="h-5 w-5 text-gray-500" />
				</div>
				<div className="scrollbar-hide -mx-1 flex gap-3 overflow-x-auto px-1 pb-2">
					{favoritePartners.map((partner) => (
						<MinimalFavoriteCard
							key={partner.id}
							name={partner.name}
							profession={partner.profession}
							rating={partner.rating}
							location={partner.location}
							imageUrl={partner.imageUrl}
							rate={partner.rate} // ✅ now passing rate
						/>
					))}
				</div>
			</section>

			{/* Recently Viewed */}
			<section className="mb-10">
				<div className="mb-2 flex items-center justify-between">
					<h2 className="text-lg font-semibold">Recently Viewed</h2>
					<ChevronRight className="h-5 w-5 text-gray-500" />
				</div>
				<div className="space-y-3">
					{partners.map((partner) => (
						<PartnerCard
							key={partner.id}
							name={partner.name}
							profession={partner.profession}
							rating={partner.rating}
							location={partner.location}
							imageUrl={partner.imageUrl}
						/>
					))}
				</div>
			</section>

			<AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
		</div>
	);
}
