"use client";

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

export default function Home() {
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

	// We no longer need the old handleBecomePartnerClick function

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">KLUTCH</h1>

				{/* 4. Conditionally render the button based on the session state */}
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

			<div className="mt-8 flex flex-col gap-3">
				<h1 className="text-xl">Recently Viewed</h1>
				<div className="h-[200px] w-full bg-rose-500"></div>
			</div>

			<div className="mt-8 flex flex-col gap-3">
				<h1 className="text-xl">Favorites</h1>
				<div className="h-[200px] w-full bg-rose-500"></div>
			</div>

			<AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
		</div>
	);
}
