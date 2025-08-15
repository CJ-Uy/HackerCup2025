"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { OnboardingFormData } from "./types";

interface Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
	prevStep: () => void;
}

export function Step3_ServiceArea({ formData, setFormData, nextStep, prevStep }: Props) {
	const isFormValid = formData.address.trim() !== "";
	// NOTE: A real app would use Google Places API for address autocomplete
	// and derive lat/lng from the selected address.
	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Service Area</h2>
				<p className="text-muted-foreground">Where are you based and how far will you travel?</p>
			</div>
			<div className="space-y-4">
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="address">Your Base Address *</Label>
					<Input
						id="address"
						placeholder="e.g., 123 Main St, Quezon City"
						value={formData.address}
						onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
					/>
				</div>
				<div>
					<Label className="mb-3">Service Radius: {formData.serviceRadiusKm} km</Label>
					<Slider
						defaultValue={[formData.serviceRadiusKm]}
						max={25}
						step={1}
						onValueChange={(value) =>
							setFormData((prev) => ({ ...prev, serviceRadiusKm: value[0] }))
						}
					/>
				</div>
			</div>
			<div className="flex justify-between">
				<Button variant="outline" onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep} disabled={!isFormValid}>
					Next: Certifications
				</Button>
			</div>
		</div>
	);
}
