"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaEye, FaEyeSlash, FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
	rememberMe: z.boolean().default(false).optional(),
});

interface LoginFormProps {
	onSuccess: () => void;
	onSwitchToSignUp: () => void;
}

export function LoginForm({ onSuccess, onSwitchToSignUp }: LoginFormProps) {
	const supabase = createClient();
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setIsLoading(true);
		setError(null);
		const { error } = await supabase.auth.signInWithPassword({
			email: values.email,
			password: values.password,
		});
		setIsLoading(false);

		if (error) {
			setError(error.message);
			return;
		}
		form.reset();
		onSuccess();
	}

	async function handleSocialLogin(provider: "google" | "linkedin") {
		setIsLoading(true);
		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${window.location.origin}/auth/callback`,
			},
		});
		setIsLoading(false);
		if (error) {
			setError(error.message);
		}
	}

	return (
		<div className="w-full max-w-sm">
			{/* Header */}
			<div className="mb-8 text-center">
				<h1 className="mb-2 text-4xl font-extrabold text-gray-900">KLUTCH</h1>
				<p className="text-lg text-gray-600">Your Job at Your Price</p>
			</div>

			{/* Social Login Buttons */}
			<div className="mb-6 space-y-3">
				<Button
					onClick={() => handleSocialLogin("google")}
					variant="outline"
					className="flex w-full items-center justify-center gap-3 py-6 text-base"
					disabled={isLoading}
				>
					<img
						width="20"
						height="20"
						src="https://img.icons8.com/fluency/48/google-logo.png"
						alt="google-logo"
					/>
					Continue with Google
				</Button>
				<Button
					onClick={() => handleSocialLogin("linkedin")}
					variant="outline"
					className="flex w-full items-center justify-center gap-3 py-6 text-base"
					disabled={isLoading}
				>
					<FaLinkedin size={20} className="text-[#0A66C2]" />
					Continue with LinkedIn
				</Button>
			</div>

			{/* Divider */}
			<div className="relative mb-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-300" />
				</div>
				<div className="relative flex justify-center text-sm">
					<span className="bg-background text-muted-foreground px-2">Or continue with email</span>
				</div>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

					{/* Remember Me & Forgot Password */}
					<div className="flex items-center justify-between">
						<FormField
							control={form.control}
							name="rememberMe"
							render={({ field }) => (
								<FormItem className="flex flex-row items-start space-y-0 space-x-2">
									<FormControl>
										<Checkbox checked={field.value} onCheckedChange={field.onChange} />
									</FormControl>
									<FormLabel className="text-sm font-normal text-gray-700">Remember me</FormLabel>
								</FormItem>
							)}
						/>
						<Link href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
							Forgot password?
						</Link>
					</div>

					{error && <p className="text-sm text-red-500">{error}</p>}

					<Button
						type="submit"
						className="h-12 w-full bg-blue-600 text-base font-semibold hover:bg-blue-700"
						disabled={isLoading}
					>
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>

					<p className="pt-2 text-center text-sm text-gray-600">
						Don&apos;t have an account?{" "}
						<button
							type="button"
							onClick={onSwitchToSignUp}
							className="font-semibold text-blue-600 hover:text-blue-500"
						>
							Sign up for free
						</button>
					</p>
				</form>
			</Form>
		</div>
	);
}
