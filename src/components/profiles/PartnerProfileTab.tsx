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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updatePartnerProfile } from "@/lib/actions/profile";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { FullUserProfile } from "@/app/profile/page";

interface Props {
	profile: FullUserProfile;
}

export function PartnerProfileTab({ profile }: Props) {
	const partnerProfile = profile.partner_profiles;
	const [open, setOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const [nickname, setNickname] = useState(partnerProfile?.nickname || "");
	const [bio, setBio] = useState(partnerProfile?.bio || "");

	if (!partnerProfile) {
		return (
			<Card className="p-8 text-center">
				<CardTitle>You are not a partner yet.</CardTitle>
				<CardDescription className="mt-2">
					Complete the onboarding process to manage your partner profile.
				</CardDescription>
				<Button asChild className="mt-4">
					<Link href="/partner-onboarding">Become a Partner</Link>
				</Button>
			</Card>
		);
	}

	const handleSave = () => {
		startTransition(async () => {
			const result = await updatePartnerProfile(partnerProfile.id, { nickname, bio });
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
					<span>Partner Information</span>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm">
								<Pencil className="mr-2 h-4 w-4" /> Edit
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Edit Partner Information</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid gap-1.5">
									<Label htmlFor="nickname">Public Nickname</Label>
									<Input
										id="nickname"
										value={nickname}
										onChange={(e) => setNickname(e.target.value)}
									/>
								</div>
								<div className="grid gap-1.5">
									<Label htmlFor="bio">Professional Bio</Label>
									<Textarea
										id="bio"
										value={bio}
										onChange={(e) => setBio(e.target.value)}
										className="min-h-[120px]"
									/>
								</div>
							</div>
							<Button onClick={handleSave} disabled={isPending}>
								{isPending ? "Saving..." : "Save Changes"}
							</Button>
						</DialogContent>
					</Dialog>
				</CardTitle>
				<CardDescription>Details that customers will see on your public profile.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 text-sm">
				<div className="flex justify-between border-b pb-2">
					<span className="text-muted-foreground">Nickname</span>
					<span className="font-medium">{partnerProfile.nickname || "Not set"}</span>
				</div>
				<div>
					<h3 className="text-muted-foreground mb-1">Bio</h3>
					<p className="font-medium whitespace-pre-wrap">{partnerProfile.bio || "Not set"}</p>
				</div>
				{/* Add Skills, Certs etc. here following the same pattern */}
			</CardContent>
		</Card>
	);
}
