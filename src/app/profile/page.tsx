import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ProfilePage } from "@/components/profiles/ProfilePage";

// Define combined type for clarity
export type FullUserProfile = {
	id: string;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	phone: string | null;
	profilePictureUrl: string | null;
	partner_profiles: {
		id: string;
		nickname: string | null;
		bio: string | null;
	} | null;
};

export default async function Profile() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		redirect("/login"); // Or your auth page
	}

	// --- QUERY 1: Fetch the user profile (guaranteed to exist for a logged-in user) ---
	const { data: userProfile, error: userError } = await supabase
		.from("user_profiles")
		.select(
			`
      id,
      email,
      firstName,
      lastName,
      phone,
      profilePictureUrl
    `,
		)
		.eq("id", user.id)
		.single();

	// Handle case where user_profile might not exist yet
	if (userError || !userProfile) {
		console.error("Error fetching user profile:", userError);
		// You might want to redirect to a profile setup page
		return <div>Could not load your profile. Please complete your registration.</div>;
	}

	// --- QUERY 2: Fetch the partner profile (may or may not exist) ---
	const { data: partnerProfile, error: partnerError } = await supabase
		.from("partner_profiles")
		.select(
			`
      id,
      nickname,
      bio
    `,
		)
		.eq("user_profile_id", user.id)
		.single(); // .single() is fine, it will return null if not found, not an error

	if (partnerError && partnerError.code !== "PGRST116") {
		// We only care about errors that are NOT "No rows found"
		console.error("Error fetching partner profile:", partnerError);
	}

	// --- Combine the results into a single object for the client component ---
	const fullProfile: FullUserProfile = {
		...userProfile,
		partner_profiles: partnerProfile, // This will be the partner profile object or null
	};

	return <ProfilePage profile={fullProfile} />;
}
