"use client";

import JobTitles from "@/components/JobTitles";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const router = useRouter();

	const handleSearch = (e) => {
		e.preventDefault();

		console.log("Searching for:", searchQuery);
	};

	const handleBecomePartnerClick = async () => {
		const supabase = createClient();
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (session) {
			router.push("/partner-dashboard");
		} else {
			setIsAuthModalOpen(true);
		}
	};

	return (
		<div>
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">KLUTCH</h1>
				<Button
					onClick={handleBecomePartnerClick}
					variant="outline"
					className="border font-semibold"
				>
					Become a Partner <FaArrowRight className="mt-0.5 size-3" />
				</Button>
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
