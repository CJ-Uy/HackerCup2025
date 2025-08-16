"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, FileText, Loader2 } from "lucide-react"; // Import Loader2
import { useState } from "react";
import { CertificationData, OnboardingFormData } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

interface Props {
	formData: OnboardingFormData;
	setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
	handleSubmit: () => void;
	prevStep: () => void;
	isLoading: boolean;
}

function AddCertificationForm({ onAdd }: { onAdd: (cert: CertificationData) => void }) {
	const [title, setTitle] = useState("");
	const [issuingBody, setIssuingBody] = useState("");
	const [validUntil, setValidUntil] = useState<Date | undefined>();
	const [file, setFile] = useState<File | null>(null);

	const handleAddClick = () => {
		if (title && file) {
			onAdd({ id: crypto.randomUUID(), title, issuingBody, validUntil, file });
		}
	};

	return (
		<div className="grid gap-4 py-4">
			<div className="grid items-center gap-1.5">
				<Label htmlFor="cert-title">Certification Name *</Label>
				<Input id="cert-title" value={title} onChange={(e) => setTitle(e.target.value)} />
			</div>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="cert-issuer">Issuing Organization</Label>
				<Input
					id="cert-issuer"
					value={issuingBody}
					onChange={(e) => setIssuingBody(e.target.value)}
				/>
			</div>
			<div className="grid items-center gap-1.5">
				<Label>Valid Until (Optional)</Label>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant={"outline"} className="w-full justify-start text-left font-normal">
							{validUntil ? format(validUntil, "PPP") : <span>Pick a date</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0">
						<Calendar mode="single" selected={validUntil} onSelect={setValidUntil} initialFocus />
					</PopoverContent>
				</Popover>
			</div>
			<div className="grid items-center gap-1.5">
				<Label htmlFor="cert-file">Upload Document (PDF, JPG, PNG) *</Label>
				<Input
					id="cert-file"
					type="file"
					onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
				/>
			</div>
			<Button onClick={handleAddClick} disabled={!title || !file}>
				Add Certification
			</Button>
		</div>
	);
}

export function Step4_Certifications({
	formData,
	setFormData,
	prevStep,
	handleSubmit,
	isLoading,
}: Props) {
	const [open, setOpen] = useState(false);
	const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
	const [keywordsGenerated, setKeywordsGenerated] = useState(false);
	const [generatedKeywords, setGeneratedKeywords] = useState("");

	const removeCertification = (id: string) => {
		setFormData((prev) => ({
			...prev,
			certifications: prev.certifications.filter((c) => c.id !== id),
		}));
	};

	const handleAdd = (cert: CertificationData) => {
		setFormData((prev) => ({ ...prev, certifications: [...prev.certifications, cert] }));
		setOpen(false);
	};

	const handleGenerateKeywords = async () => {
		setIsGeneratingKeywords(true);
		setKeywordsGenerated(false); // Reset on each generation attempt
		setGeneratedKeywords("");

		// Combine all relevant string data from the formData
		const skillsText = formData.skills.map((skill) => skill.name).join(", ");
		const certsText = formData.certifications.map((cert) => cert.title).join(", ");
		const textToAnalyze = `
            Nickname: ${formData.nickname}.
            Bio: ${formData.bio}.
            Offered Skills: ${skillsText}.
            Address: ${formData.address}.
            Certifications: ${certsText}.
        `;

		try {
			const response = await fetch("/api/getKeyWords", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				// The API expects an object with a 'text' property
				body: JSON.stringify({ text: textToAnalyze }),
			});

			if (!response.ok) {
				throw new Error(`API request failed with status ${response.status}`);
			}

			const data = await response.json();
			// Combine keywords from all categories returned by the API
			const allKeywords = [
				...(data.primary_trade || []),
				...(data.specific_services || []),
				...(data.qualities || []),
			];

			// Ensure we only have unique keywords
			const uniqueKeywords = [...new Set(allKeywords)];

			if (uniqueKeywords.length > 0) {
				const keywordsString = uniqueKeywords.join(", ");
				setGeneratedKeywords(keywordsString);
				// Optionally save the keywords back to the main form state
				setFormData((prev) => ({ ...prev, aiTags: keywordsString }));
				setKeywordsGenerated(true);
			} else {
				setGeneratedKeywords(
					"No relevant keywords found. Try adding more detail to your bio or skills.",
				);
				setKeywordsGenerated(false);
			}
		} catch (error) {
			console.error("Failed to generate keywords:", error);
			setGeneratedKeywords("An error occurred while generating keywords. Please try again.");
			setKeywordsGenerated(false);
		} finally {
			setIsGeneratingKeywords(false);
		}
	};

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold">Certifications & Verification</h2>
				<p className="text-muted-foreground">
					Build trust by uploading relevant licenses or certifications.
				</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Your Documents</span>
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogTrigger asChild>
								<Button variant="outline" size="sm">
									<Plus className="mr-2 h-4 w-4" /> Add
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Add New Certification</DialogTitle>
								</DialogHeader>
								<AddCertificationForm onAdd={handleAdd} />
							</DialogContent>
						</Dialog>
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{formData.certifications.length === 0 ? (
						<p className="text-muted-foreground py-4 text-center text-sm">
							No certifications added yet.
						</p>
					) : (
						formData.certifications.map((cert) => (
							<div
								key={cert.id}
								className="bg-muted flex items-center justify-between rounded-md p-3"
							>
								<div className="flex items-center gap-3">
									<FileText className="h-5 w-5" />
									<div>
										<p className="font-medium">{cert.title}</p>
										<p className="text-muted-foreground text-sm">{cert.issuingBody}</p>
									</div>
								</div>
								<Button variant="ghost" size="icon" onClick={() => removeCertification(cert.id)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))
					)}
				</CardContent>
			</Card>

			<div className="grid w-full gap-1.5">
				<Button onClick={handleGenerateKeywords} disabled={isGeneratingKeywords}>
					{isGeneratingKeywords ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Generating...
						</>
					) : (
						"Generate Keyword Tags"
					)}
				</Button>
				<Textarea
					id="ai-tags"
					placeholder="Click 'Generate Keyword Tags' to create AI-powered search tags based on your profile."
					value={generatedKeywords}
					className="min-h-[120px]"
					readOnly // Use readOnly to allow text selection but prevent user input
				/>
			</div>

			<div className="flex justify-between">
				<Button variant="outline" onClick={prevStep} disabled={isLoading || isGeneratingKeywords}>
					Back
				</Button>
				<Button
					onClick={handleSubmit}
					disabled={isLoading || isGeneratingKeywords || !keywordsGenerated}
				>
					{isLoading ? "Submitting..." : "Finish & Submit"}
				</Button>
			</div>
		</div>
	);
}
