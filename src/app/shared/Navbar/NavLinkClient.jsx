"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavLinkClient = ({ filterNav }) => {
    const pathname = usePathname();
    const normalizePath = (path) => path.replace(/\/+$/, '') || '/';
    const currentPath = normalizePath(pathname);

    return (
        <div className="container mx-auto px-3 py-1 sm:px-4">
            <div className="flex w-full items-center justify-center gap-3 overflow-x-auto whitespace-nowrap text-xs font-medium text-gray-700 sm:gap-4 sm:text-sm md:gap-5 md:text-base">

                {/* Home */}
                <Link
                    href="/"
                    aria-current={currentPath === '/' ? 'page' : undefined}
                    className={`shrink-0 transition-colors duration-200 ${
                        currentPath === '/'
                            ? "font-semibold text-blue-600"
                            : "text-gray-700 hover:text-blue-600"
                    }`}
                >
                    হোম
                </Link>

                {/* Categories */}
                {filterNav.map((n) => {
                    const slug = normalizePath(n.slug.startsWith("/")
                        ? n.slug
                        : `/${n.slug}`);
                    const isActive = currentPath === slug;

                    return (
                        <Link
                            key={n.slug}
                            href={slug}
                            aria-current={isActive ? 'page' : undefined}
                            className={`shrink-0 transition-colors duration-200 ${
                                isActive
                                    ? "font-semibold text-blue-600"
                                    : "text-gray-700 hover:text-blue-600"
                            }`}
                        >
                            {n.title}
                        </Link>
                    );
                })}

            </div>
        </div>
    );
};

export default NavLinkClient;