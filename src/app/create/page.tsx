"use client"

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const PostForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        media: null as File | null
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({
            ...prev,
            media: file
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const handleClose = () => {
        console.log('Form closed');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="hover:bg-gray-100 p-2"
                    >
                        <X className="size-7 text-gray-600" />
                    </Button>
                    <Button
                        type="submit"
                        form="post-form"
                        className="bg-[#1B365D] hover:bg-gray-800 text-white px-6 py-2 rounded-full"
                    >
                        Post
                    </Button>
                </div>

                {/* Form */}
                <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-3">
                        <Label htmlFor="title" className="text-gray-700 font-medium text-base">
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-3">
                        <Label htmlFor="description" className="text-gray-700 font-medium text-base">
                            Description *
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe what you're looking for..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent min-h-[120px] resize-none"
                        />
                    </div>

                    {/* Budget */}
                    <div className="space-y-3">
                        <Label htmlFor="budget" className="text-gray-700 font-medium text-base">
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
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
                        />
                    </div>

                    {/* Media Upload */}
                    <div className="space-y-3">
                        <Label htmlFor="media" className="text-gray-700 font-medium text-base">
                            Media
                        </Label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors bg-white">
                            <input
                                id="media"
                                name="media"
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <Label
                                htmlFor="media"
                                className="cursor-pointer flex flex-col items-center gap-2"
                            >
                                <Plus className="h-8 w-8 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {formData.media ? formData.media.name : 'Click to upload image or video'}
                                </span>
                                <span className="text-xs text-gray-400">
                                    PNG, JPG, GIF, MP4 up to 10MB
                                </span>
                            </Label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostForm;