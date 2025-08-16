"use client";

import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import Image from "next/image";
import { BellDot } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { usePathname } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

// Define a type for your user profile for type safety
type UserProfile = {
	profilePictureUrl: string | null;
	// Add other profile fields if you need them, e.g., username: string;
};

export default function Navbar() {
	// Bonus Improvement: Use usePathname() for better Next.js integration
	const currentPath = usePathname();
	const supabase = createClient();

	// 2. State to hold the session and user profile data
	const [session, setSession] = useState<Session | null>(null);
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		// 3. Listen for authentication state changes (login, logout)
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange(async (_event, session) => {
			setSession(session);
			setLoading(false);
		});

		// Fetch initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setLoading(false);
		});

		// Cleanup the subscription when the component unmounts
		return () => {
			subscription.unsubscribe();
		};
	}, [supabase.auth]);

	useEffect(() => {
		// 4. Fetch the user profile when the session is available
		const fetchProfile = async () => {
			if (session?.user) {
				const { data, error } = await supabase
					.from("user_profiles") // Your public profiles table
					.select("profilePictureUrl") // Select only the column you need
					.eq("id", session.user.id)
					.single();

				if (error) {
					console.error("Error fetching user profile:", error);
					setProfile(null);
				} else {
					setProfile(data);
				}
			} else {
				// If there's no session, clear the profile
				setProfile(null);
			}
		};

		fetchProfile();
	}, [session, supabase]); // This effect runs whenever the session changes

	// Pages where navbar should be hidden
	const hiddenRoutes = ["/signup", "/login", "/auth/signup", "/auth/login", "/create"];
	const shouldHideNavbar = hiddenRoutes.includes(currentPath) || (!loading && !session);

	if (shouldHideNavbar) {
		return null;
	}

	// 5. Determine the correct avatar URL
	// Default to your placeholder SVG in the public folder
	const avatarUrl = profile?.profilePictureUrl || "/default-avatar.svg";

	return (
		<nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
			{/* Home Icon */}
			<button
				onClick={() => router.push("/")}
				className="rounded-lg p-2 transition-colors hover:bg-gray-50"
			>
				<AiOutlineHome className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Grid/Menu Icon */}
			<button
				onClick={() => router.push("/activity")}
				className="rounded-lg p-2 transition-colors hover:bg-gray-50"
			>
				<HiOutlineViewGrid className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Plus Button (Center) */}
			<button
				onClick={() => router.push("/new-posting")}
				className="rounded-full bg-[#1B365D] p-3 shadow-sm transition-colors hover:bg-[#1B365D]/80"
			>
				<AiOutlinePlus className="h-6 w-6" color="#fff" />
			</button>

			{/* Notification Icon */}
			<button
				onClick={() => router.push("/notifications")}
				className="relative rounded-lg p-2 transition-colors hover:bg-gray-50"
			>
				<BellDot className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Profile Picture */}
			<button
				onClick={() => router.push("/profile")}
				className="rounded-lg p-2 transition-colors hover:bg-gray-50"
			>
				{/* 6. Use the dynamic avatarUrl in the Image component */}
				<Image
					src={avatarUrl}
					width={32} // Use pixel values for width/height
					height={32}
					alt="Profile"
					className="h-8 w-8 rounded-full bg-[#1B365D] object-cover"
					key={avatarUrl}
				/>
			</button>
		</nav>
	);
}
