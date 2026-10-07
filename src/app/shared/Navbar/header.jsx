import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserInfo from '@/app/components/UserInfo';

const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-4">
            <div className="relative flex h-12 items-center border-b border-gray-200 pb-3 sm:h-14 sm:pb-4">

                {/* Logo + Brand + Date */}
                <div className="flex min-w-0 items-center gap-2 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm sm:h-11 sm:w-11">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="h-7 w-7 object-contain sm:h-9 sm:w-9"
                        />
                    </div>

                    <div className="min-w-0">
                        <h2 className="whitespace-nowrap text-base font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
                            Dispatch <span className="text-blue-600">BD</span>
                        </h2>

                        <p className="whitespace-nowrap text-[8px] font-medium text-gray-500 sm:text-xs md:text-sm">
                            {date}
                        </p>
                    </div>
                </div>

                {/* Authentication Buttons */}
                
             <UserInfo />
            </div>
        </div>
    );
};

export default Header;