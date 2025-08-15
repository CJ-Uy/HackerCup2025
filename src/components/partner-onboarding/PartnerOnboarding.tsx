"use client";

import { useState } from "react";
import { OnboardingFormData } from "./types";
import { Progress } from "@/components/ui/progress";
import { Step1_Profile } from "./Step1_Profile";
import { Step2_Skills } from "./Step2_Skills";
import { Step3_ServiceArea } from "./Step3_ServiceArea";
import { Step4_Certifications } from "./Step4_Certifications";
import { ConfirmationStep } from "./ConfirmationStep";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TOTAL_STEPS = 4;

const initialData: OnboardingFormData = {
	nickname: "",
	bio: "",
	skills: [],
	address: "",
	latitude: 14.566478865486728, // Should be set by a real address API
	longitude: 120.99291085232736, // Should be set by a real address API
	serviceRadiusKm: 10,
	certifications: [],
};

export function PartnerOnboarding() {
	const [currentStep, setCurrentStep] = useState(1);
	const [formData, setFormData] = useState<OnboardingFormData>(initialData);
	const [submittedData, setSubmittedData] = useState<OnboardingFormData | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const supabase = createClient();

	const nextStep = () => setCurrentStep((prev) => (prev < TOTAL_STEPS + 1 ? prev + 1 : prev));
	const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));

	const handleSubmit = async () => {
		setIsLoading(true);

		// 1. Get current user
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			toast("Error: You must be logged in.");
			setIsLoading(false);
			return;
		}

		try {
			// 2. Insert into partner_profiles
			const { data: partnerProfiles, error: partnerError } = await supabase
				.from("partner_profiles")
				.insert({
					userProfileId: user.id,
					nickname: formData.nickname,
					bio: formData.bio,
					address: formData.address,
					latitude: formData.latitude,
					longitude: formData.longitude,
					serviceRadiusKm: formData.serviceRadiusKm,
				})
				.select();

			if (partnerError) throw partnerError;
			if (!partnerProfiles || partnerProfiles.length === 0) {
				throw new Error("Failed to create partner profile.");
			}
			const partnerProfile = partnerProfiles[0];

			// 3. Insert skills into partner_skills
			if (formData.skills.length > 0) {
				const skillsToInsert = formData.skills.map((skill) => ({
					partner_profile_id: partnerProfile.id,
					tag_id: skill.id,
				}));
				const { error: skillsError } = await supabase
					.from("partner_skills")
					.insert(skillsToInsert);
				if (skillsError) throw skillsError;
			}

			// 4. Upload certifications to Storage and insert into certifications table
			for (const cert of formData.certifications) {
				const file = cert.file;
				const filePath = `${user.id}/${partnerProfile.id}/${Date.now()}-${file.name}`;

				const { error: uploadError } = await supabase.storage
					.from("certifications") // Make sure this bucket exists in Supabase
					.upload(filePath, file);

				if (uploadError) throw uploadError;

				const { data: urlData } = supabase.storage.from("certifications").getPublicUrl(filePath);

				const { error: certInsertError } = await supabase.from("certifications").insert({
					title: cert.title,
					issuing_body: cert.issuingBody,
					file_url: urlData.publicUrl,
					valid_until: cert.validUntil?.toISOString(),
					partner_profile_id: partnerProfile.id,
				});

				if (certInsertError) throw certInsertError;
			}

			toast("Success: Your partner profile is live.");
			setSubmittedData(formData);
			nextStep(); // Move to confirmation step
		} catch (error: any) {
			console.error("Onboarding submission error:", error);
			toast(`Submission Failed: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	const renderStep = () => {
		switch (currentStep) {
			case 1:
				return <Step1_Profile formData={formData} setFormData={setFormData} nextStep={nextStep} />;
			case 2:
				return (
					<Step2_Skills
						formData={formData}
						setFormData={setFormData}
						nextStep={nextStep}
						prevStep={prevStep}
					/>
				);
			case 3:
				return (
					<Step3_ServiceArea
						formData={formData}
						setFormData={setFormData}
						nextStep={nextStep}
						prevStep={prevStep}
					/>
				);
			case 4:
				return (
					<Step4_Certifications
						formData={formData}
						setFormData={setFormData}
						prevStep={prevStep}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
					/>
				);
			case 5:
				return (
					<div>
						{submittedData && (
							<Card className="mb-6">
								<CardHeader>
									<CardTitle>Submission Data</CardTitle>
								</CardHeader>
								<CardContent>
									<pre className="bg-muted text-muted-foreground overflow-x-auto rounded-md p-4 text-sm">
										{JSON.stringify(
											submittedData,
											(key, value) => {
												if (value instanceof File) {
													return {
														name: value.name,
														size: value.size,
														type: value.type,
													};
												}
												return value;
											},
											2,
										)}
									</pre>
								</CardContent>
							</Card>
						)}
						<ConfirmationStep />
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className="mx-auto max-w-2xl space-y-8 p-4 sm:p-6 lg:p-8">
			{currentStep <= TOTAL_STEPS && (
				<div className="space-y-2">
					<p className="text-sm font-medium">
						Step {currentStep} of {TOTAL_STEPS}
					</p>
					<Progress value={(currentStep / TOTAL_STEPS) * 100} />
				</div>
			)}
			{renderStep()}
		</div>
	);
}
