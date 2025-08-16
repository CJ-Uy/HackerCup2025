"use client";

import React, { useState } from "react";
import { X, Plus, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { PostingService } from "@/lib/posting-service";
import { useAuth } from "@/hooks/useAuth";

const PostForm = () => {
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		budget: "",
		media: null as File | null,
		tags: "" as string,
	});

	const [location, setLocation] = useState<{
		latitude: number;
		longitude: number;
		address?: string;
	} | null>(null);

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isGettingLocation, setIsGettingLocation] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const router = useRouter();
	const { user } = useAuth();

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

	const handleGetLocation = async () => {
		setIsGettingLocation(true);
		setError(null);

		try {
			const locationData = await PostingService.getUserLocation();
			setLocation(locationData);
		} catch (error) {
			setError("Unable to get your location. Please enable location services.");
			console.error('Location error:', error);
		} finally {
			setIsGettingLocation(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			setError("You must be logged in to create a posting.");
			return;
		}

		if (!location) {
			setError("Please get your location before submitting.");
			return;
		}

		setIsSubmitting(true);
		setError(null);

		try {
			const budget = parseFloat(formData.budget);
			if (isNaN(budget) || budget <= 0) {
				throw new Error("Please enter a valid budget amount.");
			}

			const tags = formData.tags
				? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
				: [];

			const postingData = {
				title: formData.title,
				description: formData.description,
				budget,
				latitude: location.latitude,
				longitude: location.longitude,
				address: location.address,
				authorId: user.id,
				mediaFile: formData.media || undefined,
				tags: tags.length > 0 ? tags : undefined,
			};

			const posting = await PostingService.createPosting(postingData);

			// Redirect to activity page
			router.push("/activity");

		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : "Failed to create posting. Please try again.";
			setError(errorMessage);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleClose = () => {
		router.push("/");
	};

	return (
		<div className="min-h-screen pb-14">
			<div className="mx-auto max-w-md">
				{/* Header */}
				<div className="mb-8 flex items-center justify-between">
					<Button
						variant="ghost"
						size="icon"
						onClick={handleClose}
						className="p-2 hover:bg-gray-100"
						disabled={isSubmitting}
					>
						<X className="size-7 text-gray-600" />
					</Button>
					<Button
						type="submit"
						form="post-form"
						disabled={isSubmitting || !location}
						className="rounded-full bg-[#1B365D] px-6 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Posting...
							</>
						) : (
							"Post"
						)}
					</Button>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
						<p className="text-red-700 text-sm">{error}</p>
					</div>
				)}

				{/* Form */}
				<form id="post-form" onSubmit={handleSubmit} className="space-y-6">
					{/* Location */}
					<div className="space-y-3">
						<Label className="text-base font-medium text-gray-700">
							Location *
						</Label>
						{location ? (
							<div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
								<MapPin className="h-4 w-4 text-green-600" />
								<span className="text-sm text-green-700">
                  {location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                </span>
							</div>
						) : (
							<Button
								type="button"
								onClick={handleGetLocation}
								disabled={isGettingLocation}
								className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 hover:bg-gray-50"
								variant="outline"
							>
								{isGettingLocation ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Getting location...
									</>
								) : (
									<>
										<MapPin className="mr-2 h-4 w-4" />
										Get my location
									</>
								)}
							</Button>
						)}
					</div>

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
							Budget * (PHP)
						</Label>
						<Input
							id="budget"
							name="budget"
							type="number"
							required
							min="1"
							step="0.01"
							value={formData.budget}
							onChange={handleInputChange}
							placeholder="500.00"
							className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none"
						/>
					</div>

					{/* Tags */}
					<div className="space-y-3">
						<Label htmlFor="tags" className="text-base font-medium text-gray-700">
							Tags (Optional)
						</Label>
						<Input
							id="tags"
							name="tags"
							type="text"
							value={formData.tags}
							onChange={handleInputChange}
							placeholder="cleaning, plumbing, repair (separate with commas)"
							className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-200 focus:outline-none"
						/>
						<p className="text-xs text-gray-500">
							Separate multiple tags with commas
						</p>
					</div>

					{/* Media Upload */}
					<div className="space-y-3">
						<Label htmlFor="media" className="text-base font-medium text-gray-700">
							Media (Optional)
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