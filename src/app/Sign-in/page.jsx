import Link from 'next/link';
import React from 'react';

const SignIn = () => {
    return (
        <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-50 px-4 py-10">

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

                <div className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            ইমেইল
                        </label>

                        <input
                            type="email"
                            className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            placeholder="আপনার ইমেইল লিখুন"
                        />
                    </div>

                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <label className="block text-sm font-semibold text-gray-700">
                                পাসওয়ার্ড
                            </label>

                            <span className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-700">
                                পাসওয়ার্ড ভুলে গেছেন?
                            </span>
                        </div>

                        <input
                            type="password"
                            className="input h-12 w-full rounded-xl border-gray-200 bg-gray-50 px-4 text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            placeholder="আপনার পাসওয়ার্ড লিখুন"
                        />
                    </div>

                    <button className="btn h-12 w-full rounded-xl border-0 bg-blue-600 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md">
                        সাইন ইন করুন
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

        </div>
    );
};

export default SignIn;

