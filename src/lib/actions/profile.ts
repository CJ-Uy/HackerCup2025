"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// --- Update Regular User Profile ---
export async function updateUserProfile(
	userId: string,
	data: { firstName: string; lastName: string; phone: string },
) {
	const supabase = createClient();
	const { error } = await supabase
		.from("user_profiles")
		.update({
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone,
		})
		.eq("id", userId);

	if (error) {
		return { success: false, message: error.message };
	}

	revalidatePath("/profile");
	return { success: true, message: "Profile updated successfully." };
}

// --- Update Partner Profile ---
export async function updatePartnerProfile(
	profileId: string,
	data: { nickname: string; bio: string },
) {
	const supabase = createClient();
	const { error } = await supabase
		.from("partner_profiles")
		.update({
			nickname: data.nickname,
			bio: data.bio,
		})
		.eq("id", profileId);

	if (error) {
		return { success: false, message: error.message };
	}

	revalidatePath("/profile");
	return { success: true, message: "Partner profile updated successfully." };
}
