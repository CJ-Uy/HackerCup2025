"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

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

// 1. UPDATE ZOD SCHEMA - Phone is no longer optional
const formSchema = z.object({
	firstName: z.string().min(1, "First name is required."),
	lastName: z.string().min(1, "Last name is required."),
	email: z.string().email("Please enter a valid email."),
	password: z.string().min(6, "Password must be at least 6 characters."),
	// Remove .optional() and add a validation message
	phone: z.string().min(1, "Phone number is required."),
});

interface SignUpFormProps {
	onSuccess: () => void;
	onSwitchToLogin: () => void;
}

export function SignUpForm({ onSuccess, onSwitchToLogin }: SignUpFormProps) {
	const supabase = createClient();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			phone: "",
		},
	});

	// No changes needed in the onSubmit function.
	// It already sends the phone number correctly.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setError(null);

		const { error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				data: {
					first_name: values.firstName,
					last_name: values.lastName,
					phone: values.phone,
				},
			},
		});

		setIsLoading(false);
		if (error) {
			setError(error.message);
			return;
		}

		form.reset();
		onSuccess();
	}

	return (
		<div className="w-full max-w-sm">
			<div className="mb-8 text-center">
				<h1 className="mb-2 text-4xl font-extrabold text-gray-900">KLUTCH</h1>
				<p className="text-lg text-gray-600">Create your free account</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<div className="grid grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">First Name</FormLabel>
									<FormControl>
										<Input placeholder="John" {...field} className="h-11" />
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
									<FormLabel className="font-semibold">Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} className="h-11" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="font-semibold">Email Address</FormLabel>
								<FormControl>
									<Input placeholder="Enter your email" {...field} className="h-11" />
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
								{/* 2. UPDATE UI - Remove "(Optional)" from the label */}
								<FormLabel className="font-semibold">Phone Number</FormLabel>
								<FormControl>
									<Input type="tel" placeholder="(123) 456-7890" {...field} className="h-11" />
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
								<FormLabel className="font-semibold">Password</FormLabel>
								<FormControl>
									<div className="relative">
										<Input
											type={showPassword ? "text" : "password"}
											placeholder="Enter your password"
											{...field}
											className="h-11 pr-10"
										/>
										<button
											type="button"
											className="absolute inset-y-0 right-0 flex items-center pr-3"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? (
												<FaEyeSlash className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											) : (
												<FaEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
											)}
										</button>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{error && <p className="pt-2 text-sm text-red-500">{error}</p>}

					<Button
						type="submit"
						className="h-12 w-full bg-blue-600 text-base font-semibold hover:bg-blue-700"
						disabled={isLoading}
					>
						{isLoading ? "Creating account..." : "Sign up"}
					</Button>

					<p className="pt-2 text-center text-sm text-gray-600">
						Already have an account?
						<button
							type="button"
							onClick={onSwitchToLogin}
							className="ml-1 font-semibold text-blue-600 hover:text-blue-500"
						>
							Sign in
						</button>
					</p>
				</form>
			</Form>
		</div>
	);
}
