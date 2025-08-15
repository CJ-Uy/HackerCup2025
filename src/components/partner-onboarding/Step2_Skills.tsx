// components/partner-onboarding/Step2_Skills.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OnboardingFormData, SkillTag } from "./types";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// In a real app, you would fetch these from your 'tags' table
const MOCK_SKILLS: SkillTag[] = [
	{ id: "1", name: "Plumber" },
	{ id: "2", name: "Electrician" },
	{ id: "3", name: "Carpenter" },
	{ id: "4", name: "Painter" },
	{ id: "5", name: "Landscaper" },
];

interface Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	nextStep: () => void;
	prevStep: () => void;
}

export function Step2_Skills({ formData, setFormData, nextStep, prevStep }: Props) {
	const [inputValue, setInputValue] = useState("");
	const availableSkills = MOCK_SKILLS.filter(
		(skill) =>
			!formData.skills.some((s) => s.id === skill.id) &&
			skill.name.toLowerCase().includes(inputValue.toLowerCase()),
	);

	const addSkill = (skill: SkillTag) => {
		setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
		setInputValue("");
	};

	const removeSkill = (skillId: string) => {
		setFormData((prev) => ({
			...prev,
			skills: prev.skills.filter((s) => s.id !== skillId),
		}));
	};

	const isFormValid = formData.skills.length > 0;

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Skills & Expertise</h2>
				<p className="text-muted-foreground">
					Select the skills you offer. This helps customers find you.
				</p>
			</div>
			<div className="space-y-4">
				<div className="grid w-full items-center gap-1.5">
					<Label htmlFor="skills">Add Skills *</Label>
					<div className="flex items-center space-x-2">
						<Input
							id="skills"
							placeholder="Type to search for a skill..."
							value={inputValue}
							onChange={(e) => setInputValue(e.target.value)}
						/>
					</div>
					{inputValue && availableSkills.length > 0 && (
						<div className="mt-2 max-h-40 overflow-y-auto rounded-md border p-2">
							{availableSkills.map((skill) => (
								<div
									key={skill.id}
									className="hover:bg-accent cursor-pointer rounded p-2"
									onClick={() => addSkill(skill)}
								>
									{skill.name}
								</div>
							))}
						</div>
					)}
				</div>

				<div className="flex min-h-[40px] flex-wrap gap-2">
					{formData.skills.map((skill) => (
						<Badge key={skill.id} variant="secondary" className="py-1 text-sm">
							{skill.name}
							<button
								onClick={() => removeSkill(skill.id)}
								className="hover:bg-muted-foreground/20 ml-2 rounded-full p-0.5"
							>
								<X size={14} />
							</button>
						</Badge>
					))}
				</div>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={prevStep}>
					Back
				</Button>
				<Button onClick={nextStep} disabled={!isFormValid}>
					Next: Service Area
				</Button>
			</div>
		</div>
	);
}
