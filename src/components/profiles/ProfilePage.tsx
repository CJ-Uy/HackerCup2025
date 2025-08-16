// components/profile/ProfilePage.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings, FileText, HelpCircle, LogOut, ArrowRight, UserCog } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import type { FullUserProfile } from "@/app/profile/page";

import { UserProfileTab } from "./UserProfileTab";
import { PartnerProfileTab } from "./PartnerProfileTab";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface Props {
	profile: FullUserProfile;
}

export function ProfilePage({ profile }: Props) {
	const router = useRouter();
	const supabase = createClient();
	const userInitials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`;

	// --- NEW: Function to handle user logout ---
	const handleLogout = async () => {
		// Ask for confirmation before logging out
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Error logging out:", error.message);
			// You could show an error toast here if you like
		} else {
			// Redirect to the login page after successful logout
			// router.refresh() helps clear any cached user data
			router.push("/");
			router.refresh();
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Blue Header Section */}
			<div className="bg-blue-100 p-6">
				<div className="flex items-center gap-4">
					<Avatar className="h-16 w-16 border-2 border-white">
						<AvatarImage src={profile.profilePictureUrl || undefined} alt="User profile picture" />
						<AvatarFallback>{userInitials}</AvatarFallback>
					</Avatar>
					<div>
						<h1 className="text-xl font-bold text-gray-800">
							{profile.firstName} {profile.lastName}
						</h1>
						<p className="text-sm text-gray-600">{profile.phone}</p>
					</div>
				</div>

				{/* Conditional "Become a Partner" or "Manage Partner Profile" Button */}
				{!profile.partner_profiles ? (
					<Link href="/partner-onboarding">
						<Button variant="outline" className="mt-4 w-full border-blue-300 bg-white/50">
							Become a partner <ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				) : (
					<Link href="/partner/dashboard">
						<Button variant="outline" className="mt-4 w-full border-blue-300 bg-white/50">
							Manage Partner Profile <UserCog className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				)}
			</div>

			{/* Main Content Area */}
			<div className="bg-white p-4">
				<Tabs defaultValue="user-profile" className="w-full">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="user-profile">My Profile</TabsTrigger>
						<TabsTrigger value="partner-profile">Partner Profile</TabsTrigger>
					</TabsList>
					<TabsContent value="user-profile" className="mt-4">
						<UserProfileTab profile={profile} />
					</TabsContent>
					<TabsContent value="partner-profile" className="mt-4">
						<PartnerProfileTab profile={profile} />
					</TabsContent>
				</Tabs>
			</div>

			{/* Menu Items Section */}
			<div className="mt-4 bg-white">
				<ProfileMenuItem icon={<Settings size={20} />} label="Settings" href="/settings" />
				<ProfileMenuItem icon={<FileText size={20} />} label="Terms & Conditions" href="/terms" />
				<ProfileMenuItem icon={<HelpCircle size={20} />} label="Help" href="/help" />
			</div>

			{/* Log Out Section */}
			<div className="mt-4 bg-white">
				{/* --- MODIFIED: Changed from 'href' to 'onClick' --- */}
				<ProfileMenuItem icon={<LogOut size={20} />} label="Log Out" onClick={handleLogout} />
			</div>

			<Toaster />
		</div>
	);
}
