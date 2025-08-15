"use client";

import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const PostForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		budget: "",
		media: null as File | null,
	});

	const router = useRouter();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setFormData((prev) => ({
			...prev,
			media: file,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
	};

	const handleClose = () => {
		router.push("/");
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="mx-auto max-w-md">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleClose}
						className="p-2 hover:bg-gray-100"
					>
						<X className="size-7 text-gray-600" />
					</Button>
					<Button
						type="submit"
						form="post-form"
						className="rounded-full bg-[#1B365D] px-6 py-2 text-white hover:bg-gray-800"
					>
						Post
					</Button>
				</div>

				{/* Form */}
				<form id="post-form" onSubmit={handleSubmit} className="space-y-6">
					{/* Title */}
					<div className="space-y-3">
						<Label htmlFor="title" className="text-base font-medium text-gray-700">
							Title *
						</Label>
						<Input
							id="title"
							name="title"
							type="text"
							required
							value={formData.title}
							onChange={handleInputChange}
							placeholder="Looking for..."
							className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none"
						/>
					</div>

					{/* Description */}
					<div className="space-y-3">
						<Label htmlFor="description" className="text-base font-medium text-gray-700">
							Description *
						</Label>
						<Textarea
							id="description"
							name="description"
							required
							value={formData.description}
							onChange={handleInputChange}
							placeholder="Describe what you're looking for..."
							className="min-h-[120px] w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none"
						/>
					</div>

					{/* Budget */}
					<div className="space-y-3">
						<Label htmlFor="budget" className="text-base font-medium text-gray-700">
							Budget *
						</Label>
						<Input
							id="budget"
							name="budget"
							type="text"
							required
							value={formData.budget}
							onChange={handleInputChange}
							placeholder="(ex. 500)"
							className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none"
						/>
					</div>

					{/* Media Upload */}
					<div className="space-y-3">
						<Label htmlFor="media" className="text-base font-medium text-gray-700">
							Media
						</Label>
						<div className="rounded-lg border-2 border-dashed border-gray-200 bg-white p-6 text-center transition-colors hover:border-gray-300">
							<input
								id="media"
								name="media"
								type="file"
								accept="image/*,video/*"
								onChange={handleFileChange}
								className="hidden"
							/>
							<Label htmlFor="media" className="flex cursor-pointer flex-col items-center gap-2">
								<Plus className="h-8 w-8 text-gray-400" />
								<span className="text-sm text-gray-600">
									{formData.media ? formData.media.name : "Click to upload image or video"}
								</span>
								<span className="text-xs text-gray-400">PNG, JPG, GIF, MP4 up to 10MB</span>
							</Label>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostForm;
