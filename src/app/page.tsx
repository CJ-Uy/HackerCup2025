"use client"

import JobTitles from "@/components/JobTitles";
import {Button} from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        console.log("Searching for:", searchQuery);
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">KLUTCH</h1>
                <Button
                    variant="outline"
                    className="font-semibold border"
                >
                    Become a Partner <FaArrowRight className="size-3 mt-0.5"/>
                </Button>
            </div>

            <div className="py-5 flex items-center justify-between gap-2">
                <form onSubmit={handleSearch} className="w-full">
                    <div className="relative">
                        <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1B365D]/50 size-5" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="What do you need?"
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-[#1B365D]/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  placeholder-[#1B365D]/50 text-sm"
                        />
                    </div>
                </form>

                <div className="border p-3 rounded-full border-[#1B365D]/50">
                    <FaMapMarkerAlt className="size-6" color="#1B365D"/>
                </div>
            </div>

            <JobTitles />

            <div className="mt-8 flex flex-col gap-3">
                <h1 className="text-xl">Recently Viewed</h1>
                <div className="bg-rose-500 w-full h-[200px]"></div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <h1 className="text-xl">Favorites</h1>
                <div className="bg-rose-500 w-full h-[200px]"></div>
            </div>
        </div>
    );
}
