"use client";

import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import Image from "next/image";
import { BellDot } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
	const [currentPath, setCurrentPath] = useState("");

	useEffect(() => {
		// Set initial path
		setCurrentPath(window.location.pathname);

		// Listen for navigation changes (for single page apps)
		const handleLocationChange = () => {
			setCurrentPath(window.location.pathname);
		};

		// Listen for popstate (back/forward button)
		window.addEventListener("popstate", handleLocationChange);

		return () => {
			window.removeEventListener("popstate", handleLocationChange);
		};
	}, []);

	// Pages where navbar should be hidden
	const hiddenRoutes = ["/signup", "/login", "/auth/signup", "/auth/login"];

	// Check if current route should hide navbar
	const shouldHideNavbar = hiddenRoutes.includes(currentPath);

	// Don't render navbar if on hidden routes
	if (shouldHideNavbar) {
		return null;
	}

	return (
		<nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
			{/* Home Icon */}
			<button className="rounded-lg p-2 transition-colors hover:bg-gray-50">
				<AiOutlineHome className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Grid/Menu Icon */}
			<button className="rounded-lg p-2 transition-colors hover:bg-gray-50">
				<HiOutlineViewGrid className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Plus Button (Center) */}
			<button className="rounded-full bg-[#1B365D] p-3 shadow-sm transition-colors hover:bg-gray-800">
				<AiOutlinePlus className="h-6 w-6" color="#fff" />
			</button>

			{/* Notification Icon */}
			<button className="relative rounded-lg p-2 transition-colors hover:bg-gray-50">
				<BellDot className="h-7 w-7" color="#1B365D" />
			</button>

			{/* Profile Picture */}
			<button className="transition-opacity hover:opacity-80">
				<Image
					// src=""
					width={10}
					height={10}
					alt="Profile"
					className="h-8 w-8 rounded-full border-2 border-gray-200 object-cover"
				/>
			</button>
		</nav>
	);
}
