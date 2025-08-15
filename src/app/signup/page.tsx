"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash, FaLinkedin } from "react-icons/fa6";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log("Login attempt:", formData);
            setIsLoading(false);
            // Handle login logic here
        }, 1000);
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        // Handle social login logic here
    };

    return (
        <div className="h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">KLUTCH</h1>
                    <h2 className="text-lg font-semibold text-gray-700">Your Job at Your Price</h2>
                </div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-6 px-4 rounded-xl sm:px-8">
                    {/* Social Login Buttons */}
                    <div className="space-y-2 mb-5">
                        <Button
                            onClick={() => handleSocialLogin('Google')}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-3 py-5 border-gray-300 hover:bg-gray-50"
                        >
                            <img width="18" height="18" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
                            Continue with Google
                        </Button>
                        <Button
                            onClick={() => handleSocialLogin('LinkedIn')}
                            variant="outline"
                            className="w-full flex items-center justify-center gap-3 py-5 border-gray-300 hover:bg-gray-50"
                        >
                            <FaLinkedin className="text-blue-600" />
                            Continue with LinkedIn
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FaEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </div>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don&#39;t have an account?{" "}
                            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up for free
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}