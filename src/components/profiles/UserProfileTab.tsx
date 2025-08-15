"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserProfile } from "@/lib/actions/profile";
import { Pencil } from "lucide-react";
import { useState, useTransition } from "react";
import type { FullUserProfile } from "@/app/profile/page";

interface Props {
	profile: FullUserProfile;
}

export function UserProfileTab({ profile }: Props) {
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const [firstName, setFirstName] = useState(profile.firstName || "");
	const [lastName, setLastName] = useState(profile.lastName || "");
	const [phone, setPhone] = useState(profile.phone || "");

	const handleSave = () => {
		startTransition(async () => {
			const result = await updateUserProfile(profile.id, { firstName, lastName, phone });
			if (result.success) {
				toast(`Success: ${result.message}`);
				setOpen(false);
			} else {
				toast(`Error: ${result.message}`);
			}
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center justify-between">
					<span>Personal Information</span>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								<Pencil className="mr-2 h-4 w-4" /> Edit
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit Personal Information</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-1.5">
									<Label htmlFor="firstName">First Name</Label>
									<Input
										id="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className="grid gap-1.5">
									<Label htmlFor="lastName">Last Name</Label>
									<Input
										id="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>
								<div className="grid gap-1.5">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
								</div>
							</div>
							<Button onClick={handleSave} disabled={isPending}>
								{isPending ? "Saving..." : "Save Changes"}
							</Button>
						</DialogContent>
					</Dialog>
				</CardTitle>
				<CardDescription>Your personal details and contact information.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 text-sm">
				<div className="flex justify-between border-b pb-2">
					<span className="text-muted-foreground">First Name</span>
					<span className="font-medium">{profile.firstName || "Not set"}</span>
				</div>
				<div className="flex justify-between border-b pb-2">
					<span className="text-muted-foreground">Last Name</span>
					<span className="font-medium">{profile.lastName || "Not set"}</span>
				</div>
				<div className="flex justify-between border-b pb-2">
					<span className="text-muted-foreground">Email</span>
					<span className="font-medium">{profile.email}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Phone</span>
					<span className="font-medium">{profile.phone || "Not set"}</span>
				</div>
			</CardContent>
		</Card>
	);
}
