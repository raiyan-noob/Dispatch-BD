import React from 'react';
import Image from 'next/image';

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
                <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
                    <button className="btn btn-xs border-gray-300 bg-white px-2 text-[10px] text-gray-700 hover:border-slate-900 hover:bg-slate-900 hover:text-white sm:btn-sm sm:px-3 sm:text-xs md:btn-md md:text-sm">
                        সাইন ইন
                    </button>

                    <button className="btn btn-xs border-0 bg-blue-600 px-2 text-[10px] text-white shadow-sm hover:bg-blue-700 sm:btn-sm sm:px-3 sm:text-xs md:btn-md md:text-sm">
                        সাইন আপ
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Header;