'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { authClient } from '../../../lib/auth-client';

const SignUp = () => {

    const router = useRouter();
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formValues = Object.fromEntries(formData.entries());

        // Check empty fields
        if (!formValues.name || !formValues.email || !formValues.password) {
            setMessage("Please fill up all the fields.");
            return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formValues.email)) {
            setMessage("Please enter a valid email address");
            return;
        }

        // Check password length
        if (formValues.password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return;
        }
        

        setMessage("");
        setIsSubmitting(true);

        try {
            const { error } = await authClient.signUp.email({
                name: formValues.name,
                email: formValues.email,
                password: formValues.password,
                callbackURL: "/"
            });

            if (error) {
                if (error.status === 400) {
                    setMessage(
                        "Sign up failed. Please check your information and try again."
                    );
                }
                else if(error.status === 422)
                    {
                        setMessage("User Already have an account. Please Sign in");
                    } 
                else {
                    setMessage(
                        `Sign up failed (${error.status}): ${error.statusText}`
                    );
                }

                return;
            }

            setMessage("Account created successfully.");
            router.replace("/");

        } catch (error) {
            console.error("Sign up request failed:", error);
            setMessage(
                "Unable to reach the authentication server. Check the browser console and server logs for details."
            );

        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">

            <form onSubmit={handleSubmit} className="w-full max-w-md">

                <fieldset className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

                    <legend className="px-2 text-xl font-bold text-blue-600">
                        সাইন আপ
                    </legend>

                    <div className="mb-7 mt-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            অ্যাকাউন্ট তৈরি করুন
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Dispatch BD-এর সাথে যুক্ত হতে আপনার তথ্যগুলো পূরণ করুন।
                        </p>
                    </div>


                    {/* MESSAGE */}
                    {message && (
                        <div
                            className={`mb-5 rounded-xl border px-4 py-3 text-sm ${
                                message === "Account created successfully."
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-red-200 bg-red-50 text-red-600"
                            }`}
                        >
                            {message}
                        </div>
                    )}


                    <div className="space-y-5">

                        {/* NAME */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                নাম
                            </label>

                            <input
                                type="text"
                                name="name"
                                required
                                className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                placeholder="আপনার নাম লিখুন"
                            />
                        </div>


                        {/* EMAIL */}
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


                        {/* PASSWORD */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                পাসওয়ার্ড
                            </label>

                            <input
                                type="password"
                                name="password"
                                required
                                minLength={8}
                                className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                                placeholder="কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।
                            </p>
                        </div>


                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn h-12 w-full rounded-xl border-0 bg-blue-600 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "সাইন আপ হচ্ছে..." : "সাইন আপ করুন"}
                        </button>

                    </div>


                    {/* LOGIN LINK */}
                    <div className="mt-6 border-t border-gray-100 pt-5 text-center">
                        <p className="text-sm text-gray-500">
                            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}

                            <Link
                                href="/Sign-in"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                লগইন করুন
                            </Link>
                        </p>
                    </div>

                </fieldset>

            </form>

        </div>
    );
};


export default SignUp;
