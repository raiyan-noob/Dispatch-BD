
"use client";

import React from "react";
import { authClient } from "../../../../lib/auth-client";

const Profile = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-1 text-sm font-medium text-blue-600">
                        Dispatch BD
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        আমার প্রোফাইল
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        আপনার অ্যাকাউন্ট এবং ব্যক্তিগত তথ্য পরিচালনা করুন
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">

                    {/* Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500"></div>

                    <div className="px-6 pb-7 sm:px-8">

                        {/* Profile Header */}
                        <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            {/* Avatar + Name */}
                            <div className="flex items-end gap-4">

                                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-blue-50 text-4xl font-bold text-blue-600 shadow-md">
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt={user.name || "User"}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        user?.name?.charAt(0)?.toUpperCase() || "U"
                                    )}
                                </div>

                                <div className="pb-1">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {user?.name || "ব্যবহারকারী"}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        ডিসপ্যাচ বিডি সদস্য
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex w-fit items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                                <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                                সক্রিয় অ্যাকাউন্ট
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-8 h-px bg-slate-100"></div>

                        {/* Account Information */}
                        <div>
                            <h3 className="mb-5 text-lg font-bold text-slate-900">
                                অ্যাকাউন্টের তথ্য
                            </h3>

                            <div className="grid gap-4 sm:grid-cols-2">

                                {/* Name */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        নাম
                                    </p>

                                    <p className="font-semibold text-slate-800">
                                        {user?.name || "তথ্য পাওয়া যায়নি"}
                                    </p>
                                </div>

                                {/* Email */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        ই-মেইল
                                    </p>

                                    <p className="break-all font-semibold text-slate-800">
                                        {user?.email || "তথ্য পাওয়া যায়নি"}
                                    </p>
                                </div>

                                {/* Account Type */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        অ্যাকাউন্টের ধরন
                                    </p>

                                    <p className="font-semibold text-slate-800">
                                        ডিসপ্যাচ বিডি ব্যবহারকারী
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        অ্যাকাউন্টের অবস্থা
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>

                                        <p className="font-semibold text-blue-700">
                                            সক্রিয়
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;


