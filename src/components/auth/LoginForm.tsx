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
	email: z.string().email({ message: "Please enter a valid email." }),
	password: z.string().min(1, { message: "Password is required." }),
});

interface LoginFormProps {
	onSuccess: () => void;
	onSwitchToSignUp: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
	const supabase = createClient();
	const [error, setError] = useState<string | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setError(null); // Reset error state
		const { error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});

		if (error) {
			setError(error.message);
			return;
		}

		// On successful login, the onAuthStateChange listener in a higher-level
		// component (like your main layout or a context provider) will detect
		// the new session. We just need to close the modal here.
		form.reset();
		onSuccess();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
					Login
				</Button>

				<p className="text-muted-foreground text-center text-sm">
					Don&apos;t have an account?
					<button
						type="button"
						onClick={onSwitchToSignUp}
						className="text-primary font-semibold underline-offset-4 hover:underline"
					>
						Sign up
					</button>
				</p>
			</form>
		</Form>
	);
}
