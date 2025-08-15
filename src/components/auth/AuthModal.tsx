"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

interface AuthModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
	const [view, setView] = useState<"login" | "signup">("login");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{view === "login" ? "Welcome back" : "Create an account"}</DialogTitle>
					<DialogDescription>
						{view === "login" ? "Sign in to continue." : "Enter your details to get started."}
					</DialogDescription>
				</DialogHeader>
				{view === "login" ? (
					<LoginForm
						onSuccess={() => onOpenChange(false)}
						onSwitchToSignUp={() => setView("signup")}
					/>
				) : (
					<SignUpForm
						onSuccess={() => onOpenChange(false)}
						onSwitchToLogin={() => setView("login")}
					/>
				)}
			</DialogContent>
		</Dialog>
	);
}
