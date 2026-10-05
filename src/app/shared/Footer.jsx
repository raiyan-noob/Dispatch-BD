"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const footerLinks = [
    {
        title: 'পাঠকের জন্য',
        links: [
            { label: 'হোম পেজ', href: '/' },
            { label: 'সর্বাধিক পঠিত', href: '/' },
        ],
    },
    {
        title: 'সংবাদ বিভাগ',
        links: [
            { label: 'প্রধান সংবাদ', href: '/' },
            { label: 'অন্যান্য খবর', href: '/', scrollTo: 'নির্বাচিত খবর' },
           
        ],
    },
];

const Footer = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [pendingScroll, setPendingScroll] = useState('');
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        if (pathname !== '/' || !pendingScroll) return;

        let frame;
        let attempts = 0;
        const scrollToSection = () => {
            const target = Array.from(document.querySelectorAll('h1, h2, h3, h4'))
                .find((heading) => heading.textContent?.trim() === pendingScroll);

            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setPendingScroll('');
                return;
            }

            if (attempts < 60) {
                attempts += 1;
                frame = window.requestAnimationFrame(scrollToSection);
            } else {
                setPendingScroll('');
            }
        };

        frame = window.requestAnimationFrame(scrollToSection);
        return () => window.cancelAnimationFrame(frame);
    }, [pathname, pendingScroll]);

    const navigateHome = (event, scrollTo) => {
        event.preventDefault();

        if (scrollTo) setPendingScroll(scrollTo);
        if (pathname === '/') {
            if (!scrollTo) window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        router.push('/');
    };

    return (
        <footer className="relative mt-16 overflow-hidden bg-slate-950 text-slate-300">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-blue-700" />

            <div className="mx-auto max-w-7xl px-4 pb-6 pt-12 sm:px-6 sm:pt-14 lg:px-8">
                <div className="grid gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
                    <div className="max-w-md">
                        <Link href="/" onClick={navigateHome} className="inline-flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400">
                            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white p-1.5 shadow-lg shadow-blue-950/30">
                                <Image
                                    src="/logo.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-contain"
                                />
                            </span>
                            <span className="text-2xl font-extrabold tracking-tight text-white">
                                Dispatch <span className="text-blue-400">BD</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                            বাংলাদেশ ও বিশ্বের সর্বশেষ সংবাদ এবং গুরুত্বপূর্ণ আপডেট—এক জায়গায়, সবসময় আপনার সঙ্গে।
                        </p>

                        <Link
                            href="/"
                            onClick={navigateHome}
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                        >
                            আজকের খবর পড়ুন
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    {footerLinks.map((group) => (
                        <nav key={group.title} aria-label={group.title}>
                            <h2 className="text-sm font-bold tracking-wide text-white">
                                {group.title}
                            </h2>
                            <ul className="mt-4 space-y-3">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            onClick={(event) => navigateHome(event, link.scrollTo)}
                                            className="text-sm text-slate-400 transition-colors hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="flex flex-col gap-3 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>© {currentYear} Dispatch BD. সর্বস্বত্ব সংরক্ষিত।</p>
                    <p className="text-slate-500">সত্য ও সময়ের পাশে</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;