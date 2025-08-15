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
	firstName: z.string().min(2, "First name must be at least 2 characters."),
	lastName: z.string().min(2, "Last name must be at least 2 characters."),
	username: z.string().min(2, "Username must be at least 2 characters."),
	email: z.string().email("Please enter a valid email."),
	password: z.string().min(6, "Password must be at least 6 characters."),
	// Making phone optional as per your Prisma schema
	phone: z.string().optional().or(z.literal("")),
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
			firstName: "",
			lastName: "",
			username: "",
			email: "",
			password: "",
			phone: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError(null);

		// Pass additional data to the `options.data` property
		const { data, error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				data: {
					first_name: values.firstName, // Use snake_case for custom metadata
					last_name: values.lastName,
					username: values.username,
					phone: values.phone,
				},
			},
		});

		if (error) {
			setError(error.message);
			return;
		}

		form.reset();
		onSuccess(); // Close modal on success
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="John" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Doe" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone (Optional)</FormLabel>
							<FormControl>
								<Input placeholder="(123) 456-7890" {...field} />
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
