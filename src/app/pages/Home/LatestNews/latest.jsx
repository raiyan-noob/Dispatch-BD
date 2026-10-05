import Link from 'next/link';
import React from 'react';

const LatestNews = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json();
    const news = data.data;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            {/* HEADER */}
            <div className="border-b border-gray-200 px-4 py-4 sm:px-5">
                <div className="flex items-center gap-3">

                    <div className="h-7 w-1 rounded-full bg-blue-600"></div>

                    <div>
                        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                            সর্বাধিক পঠিত
                        </h1>

                        <p className="mt-0.5 text-xs text-gray-400">
                            পাঠকদের সবচেয়ে পছন্দের খবর
                        </p>
                    </div>

                </div>
            </div>


            {/* NEWS LIST */}
            <div className="divide-y divide-gray-100">

                {
                    news.map((n, i) => (
                        
                        <div
                            key={i}
                            className="group flex cursor-pointer items-start gap-3 px-4 py-4 transition-all duration-200 hover:bg-blue-50/50 sm:px-5"
                        >
                            <Link href={`/pages/Details/${n.id}`}>
                            {/* NUMBER */}
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-lg font-bold text-blue-600 transition-all duration-200 group-hover:bg-blue-600 group-hover:text-white">
                                {i + 1}
                            </div>


                            {/* TITLE */}
                            <h2 className="pt-1 text-sm font-semibold leading-relaxed text-gray-800 transition-colors duration-200 group-hover:text-blue-600 sm:text-base">
                                {n.title}
                            </h2>
                        </Link>
                        </div>
                        

                    ))
                }

            </div>

        </div>
    );
};

export default LatestNews;
