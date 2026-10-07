'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { authClient } from '../../../lib/auth-client';
const UserInfo = () => {

    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const firstName = user?.name?.split(' ')[0];

    const handleSignOut = async () => {
        await authClient.signOut();
        router.replace('/');
        router.refresh();
    };

    return (
        <div className="ml-auto shrink-0">

            {!user ? (

                // LOGGED OUT
                <div className="flex items-center gap-1 sm:gap-2">

                    <Link href="/Sign-in">
                        <button className="btn btn-xs border-gray-300 bg-white px-2 text-[10px] text-gray-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:btn-sm sm:px-3 sm:text-xs md:btn-md md:text-sm">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/Sign-up">
                        <button className="btn btn-xs border-0 bg-blue-600 px-2 text-[10px] text-white shadow-sm transition-all hover:bg-blue-700 sm:btn-sm sm:px-3 sm:text-xs md:btn-md md:text-sm">
                            সাইন আপ
                        </button>
                    </Link>

                </div>

            ) : (

                // LOGGED IN
                <div className="flex items-center gap-2">

                    {/* USER PROFILE */}
                    <Link href="/pages/profile">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 py-1 pl-1 pr-3 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50">

                        {/* AVATAR */}
                        <div className="relative">

                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-sm sm:h-9 sm:w-9 sm:text-sm">
                                {firstName?.charAt(0)?.toUpperCase() || 'U'}
                            </div>

                            {/* ONLINE INDICATOR */}
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500">
                            </span>

                        </div>
                        

                        {/* FIRST NAME */}
                        <span className="hidden max-w-[100px] truncate text-sm font-semibold text-gray-700 sm:block">
                            {firstName}
                        </span>

                    </div>
                    </Link>

                    {/* LOGOUT BUTTON */}
                    <button
                        onClick={handleSignOut}
                        className="flex h-9 items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-600 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-500 sm:h-10 sm:px-4 sm:text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.8"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 15l3-3m0 0l-3-3m3 3H3"
                            />
                        </svg>

                        <span>লগ আউট</span>
                    </button>

                </div>

            )}

        </div>
    );
};

export default UserInfo;

