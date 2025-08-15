// components/partner-onboarding/Step1_Profile.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OnboardingFormData } from "./types";

interface Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
}

export function Step1_Profile({ formData, setFormData, nextStep }: Props) {
	const isFormValid = formData.nickname.trim() !== "" && formData.bio.trim() !== "";

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Your Partner Profile</h2>
				<p className="text-muted-foreground">This information will be visible to customers.</p>
			</div>
			<div className="space-y-4">
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="nickname">Public Nickname *</Label>
					<Input
						id="nickname"
						placeholder="e.g., John The Plumber"
						value={formData.nickname}
						onChange={(e) => setFormData((prev) => ({ ...prev, nickname: e.target.value }))}
					/>
				</div>
				<div className="grid w-full gap-1.5">
					<Label htmlFor="bio">Short Bio *</Label>
					<Textarea
						id="bio"
						placeholder="Describe your experience, services, and what makes you a great partner."
						value={formData.bio}
						onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
						className="min-h-[120px]"
					/>
				</div>
			</div>
			<div className="flex justify-end">
				<Button onClick={nextStep} disabled={!isFormValid}>
					Next: Skills
				</Button>
			</div>
		</div>
	);
}
