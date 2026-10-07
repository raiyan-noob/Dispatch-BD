'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authClient } from '../../../lib/auth-client';

const SignIn = () => {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleGoogle = async () => {
        setMessage("");
        setIsSubmitting(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: '/',
            });

            if (error) {
                setMessage("Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Google sign-in request failed:", error);
            setMessage("Google দিয়ে সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
            setIsSubmitting(false);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email')?.toString().trim() ?? '';
        const password = formData.get('password')?.toString() ?? '';

        if (!email || !password) {
            setMessage("Please fill up all the fields.");
            return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setMessage("Please enter a valid email address");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return;
        }

        setMessage("");
        setIsSubmitting(true);

        try {
            const { error } = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
                callbackURL: '/',
            });

            if (error) {
                setMessage(
                    error.status === 401
                        ? "Incorrect email or password."
                        : "Sign in failed. Please try again."
                );
                return;
            }

            router.replace('/');
        } catch (error) {
            console.error("Sign in request failed:", error);
            setMessage(
                "Unable to reach the authentication server. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">
            <form onSubmit={onSubmit} className="w-full max-w-md">
            <fieldset className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                <legend className="px-2 text-xl font-bold text-blue-600">
                    সাইন ইন
                </legend>

                <div className="mb-7 mt-2">
                    <h1 className="text-2xl font-bold text-gray-900">
                        স্বাগতম
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        আপনার Dispatch BD অ্যাকাউন্টে প্রবেশ করতে তথ্যগুলো দিন।
                    </p>
                </div>

                {message && (
                    <div
                        role="alert"
                        className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
                    >
                        {message}
                    </div>
                )}

                <div className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            ইমেইল
                        </label>

                        <input
                            type="email"
                            name="email"
                            required
                            className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            placeholder="আপনার ইমেইল লিখুন"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-sm font-semibold text-gray-700">
                                পাসওয়ার্ড
                            </label>
                        </div>

                        <input
                            type="password"
                            name="password"
                            required
                            minLength={8}
                            className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn h-12 w-full rounded-xl border-0 bg-blue-600 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isSubmitting ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
                    </button>

                    <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-3 text-sm text-gray-500">অথবা</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogle}
                        disabled={isSubmitting}
                        className="btn h-12 w-full rounded-xl border border-gray-200 bg-white text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <svg aria-hidden="true" viewBox="0 0 48 48" className="h-5 w-5">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.73 6C44.43 38.05 46.98 31.88 46.98 24.55Z" />
                            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19Z" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.89 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
                        </svg>
                        {isSubmitting ? "অপেক্ষা করুন..." : "Google দিয়ে সাইন ইন করুন"}
                    </button>

                </div>

                <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                    <p className="text-sm text-gray-500">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link href="/Sign-up">
                        <span className="cursor-pointer font-semibold text-blue-600 hover:text-blue-700">
                            সাইন আপ করুন
                        </span>
                        </Link>
                    </p>
                </div>

            </fieldset>
            </form>
        </div>
    );
};

export default SignIn;
