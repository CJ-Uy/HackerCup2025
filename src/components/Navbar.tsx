import { AiOutlineHome, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineViewGrid } from "react-icons/hi";
import Image from "next/image";
import { BellDot } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4 bg-white border-t border-gray-100 z-50">
            {/* Home Icon */}
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <AiOutlineHome className="w-7 h-7" color="#1B365D" />
            </button>

            {/* Grid/Menu Icon */}
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <HiOutlineViewGrid className="w-7 h-7" color="#1B365D" />
            </button>

            {/* Plus Button (Center) */}
            <button className="bg-[#1B365D] rounded-full p-3 hover:bg-gray-800 transition-colors shadow-sm">
                <AiOutlinePlus className="w-6 h-6" color="#fff"/>
            </button>

            {/* Notification Icon */}
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative">
                <BellDot className="w-7 h-7" color="#1B365D" />
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