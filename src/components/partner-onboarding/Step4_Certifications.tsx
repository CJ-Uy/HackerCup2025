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
import { Plus, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import { CertificationData, OnboardingFormData } from "./types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

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

			<div className="flex justify-between">
				<Button variant="outline" onClick={prevStep} disabled={isLoading}>
					Back
				</Button>
				<Button onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? "Submitting..." : "Finish & Submit"}
				</Button>
			</div>
		</div>
	);
}
