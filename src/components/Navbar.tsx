import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import Image from "next/image";
import { BellDot } from "lucide-react";

export default function Navbar() {
	return (
		<nav className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t border-gray-100 bg-white px-6 py-4">
			{/* Home Icon */}
			<button className="rounded-lg p-2 transition-colors hover:bg-gray-50">
				<AiOutlineHome className="h-7 w-7 text-gray-800" />
			</button>

			{/* Grid/Menu Icon */}
			<button className="rounded-lg p-2 transition-colors hover:bg-gray-50">
				<HiOutlineViewGrid className="h-7 w-7 text-gray-800" />
			</button>

			{/* Plus Button (Center) */}
			<button className="rounded-full bg-black p-3 text-white shadow-sm transition-colors hover:bg-gray-800">
				<AiOutlinePlus className="h-6 w-6" />
			</button>

			{/* Notification Icon */}
			<button className="relative rounded-lg p-2 transition-colors hover:bg-gray-50">
				<BellDot className="h-7 w-7 text-gray-800" />
			</button>

			{/* Profile Picture */}
			<button className="transition-opacity hover:opacity-80">
				{/* <Image
					src=""
					width={10}
					height={10}
					alt="Profile"
					className="h-8 w-8 rounded-full border-2 border-gray-200 object-cover"
				/> */}
			</button>
		</nav>
	);
}
