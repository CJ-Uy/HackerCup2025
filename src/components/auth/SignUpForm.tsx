"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
	username: z.string().min(2, "Username must be at least 2 characters."),
	email: z.string().email("Please enter a valid email."),
	password: z.string().min(6, "Password must be at least 6 characters."),
});

interface SignUpFormProps {
	onSuccess: () => void;
	onSwitchToLogin: () => void;
}

export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps) {
	const supabase = createClient();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError(null);
		const { data, error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				// You can pass user metadata here
				data: {
					username: values.username,
				},
			},
		});

		if (error) {
			setError(error.message);
			return;
		}

		// After sign-up, Supabase automatically signs the user in.
		// The onAuthStateChange listener will handle the session update.
		// We just close the modal.
		// If you have email confirmation enabled, the user is created but session is null until confirmed.
		form.reset();
		onSuccess();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input placeholder="your_username" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="you@example.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{error && <p className="text-sm text-red-500">{error}</p>}

				<Button type="submit" className="w-full">
					Create Account
				</Button>

				<p className="text-muted-foreground text-center text-sm">
					Already have an account?{" "}
					<button
						type="button"
						onClick={onSwitchToLogin}
						className="text-primary font-semibold underline-offset-4 hover:underline"
					>
						Login
					</button>
				</p>
			</form>
		</Form>
	);
}
