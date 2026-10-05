import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Category = async ({ params, searchParams }) => {

    const { id } = await params;
    const { page } = await searchParams;

    const currentPage = Math.max(1, Number(page) || 1);

    const res = await fetch(
        `https://news-api-v2.vercel.app/api/category/${id}`,
        {
            cache: 'no-store',
        }
    );

    if (!res.ok) {
        throw new Error('Failed to fetch category news');
    }

    const data = await res.json();
    const news = data?.data || [];


    // -----------------------------
    // PAGINATION
    // -----------------------------

    const cardsPerPage = 12;

    const totalPages = Math.ceil(news.length / cardsPerPage);

    // Make sure page doesn't go beyond available pages
    const validPage = Math.min(currentPage, Math.max(totalPages, 1));

    const startIndex = (validPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    const currentNews = news.slice(startIndex, endIndex);


    // -----------------------------
    // PAGE NUMBERS
    // -----------------------------

    const getPageNumbers = () => {

        const pages = [];

        if (totalPages <= 7) {

            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }

        } else {

            pages.push(1);

            if (validPage > 4) {
                pages.push('...');
            }

            const start = Math.max(2, validPage - 1);
            const end = Math.min(totalPages - 1, validPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (validPage < totalPages - 3) {
                pages.push('...');
            }

            pages.push(totalPages);
        }

        return pages;
    };


    return (
        <div className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-4 lg:px-6">

            {/* CATEGORY SECTION */}
            <section>

                {/* SECTION HEADER */}
                <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">

                    <div className="flex items-center gap-3">

                        <div className="h-9 w-1 rounded-full bg-blue-600"></div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900 sm:text-2xl md:text-3xl">
                                {data.title}
                            </h1>

                        </div>

                    </div>

                </div>


                {/* NEWS CARDS */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {
                        currentNews.map((n, j) => {

                            // Each news gets its own API date
                            const publishedDate = new Date(n.firstPublished);

                            const date = `${publishedDate.toLocaleDateString("bn-BD", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })} এ ${publishedDate.toLocaleTimeString("bn-BD", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                            })}`;

                            return (
                                <Link
                                    key={j}
                                    href={`/pages/Details/${n.id}`}
                                    className="group"
                                >

                                    <article
                                        className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                                    >

                                        {/* IMAGE */}
                                        <figure className="relative h-48 w-full overflow-hidden">

                                            <Image
                                                src={n.imageUrl}
                                                height={300}
                                                width={400}
                                                alt={n.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />

                                            {/* IMAGE OVERLAY */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"></div>


                                            {/* CATEGORY BADGE */}
                                            <div className="absolute bottom-3 left-3">

                                                <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
                                                    {n.category}
                                                </span>

                                            </div>

                                        </figure>


                                        {/* CONTENT */}
                                        <div className="flex flex-1 flex-col p-4">

                                            {/* TITLE */}
                                            <h2 className="line-clamp-3 text-base font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-lg">
                                                {n.title}
                                            </h2>


                                            {/* DESCRIPTION */}
                                            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600">
                                                {n.description}
                                            </p>


                                            {/* DATE */}
                                            <div className="mt-auto flex items-center gap-2 border-t border-gray-100 pt-4">

                                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></span>

                                                <p className="text-xs font-medium text-gray-400">
                                                    {date}
                                                </p>

                                            </div>

                                        </div>

                                    </article>

                                </Link>
                            );
                        })
                    }

                </div>


                {/* NO NEWS */}
                {
                    currentNews.length === 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white px-5 py-16 text-center shadow-sm">

                            <h2 className="text-lg font-semibold text-gray-700">
                                কোনো সংবাদ পাওয়া যায়নি
                            </h2>

                            <p className="mt-2 text-sm text-gray-400">
                                এই বিভাগে বর্তমানে কোনো সংবাদ নেই।
                            </p>

                        </div>
                    )
                }


                {/* PAGINATION */}
                {
                    totalPages > 1 && (
                        <div className="mt-10 flex flex-col items-center gap-4">

                            {/* PAGINATION INFO */}
                            <p className="text-xs text-gray-400 sm:text-sm">
                                পৃষ্ঠা {validPage} / {totalPages}
                            </p>


                            {/* PAGINATION BUTTONS */}
                            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-2 shadow-sm sm:gap-2">

                                {/* PREVIOUS */}
                                {
                                    validPage > 1 ? (
                                        <Link
                                            href={`?page=${validPage - 1}`}
                                            className="flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 sm:h-10 sm:px-4"
                                        >
                                            ←
                                            <span className="ml-1 hidden sm:inline">
                                                পূর্ববর্তী
                                            </span>
                                        </Link>
                                    ) : (
                                        <span
                                            className="flex h-9 cursor-not-allowed items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-300 sm:h-10 sm:px-4"
                                        >
                                            ←
                                            <span className="ml-1 hidden sm:inline">
                                                পূর্ববর্তী
                                            </span>
                                        </span>
                                    )
                                }


                                {/* PAGE NUMBERS */}
                                <div className="flex items-center gap-1">

                                    {
                                        getPageNumbers().map((pageNumber, index) => {

                                            if (pageNumber === '...') {
                                                return (
                                                    <span
                                                        key={`dots-${index}`}
                                                        className="flex h-9 w-8 items-center justify-center text-sm text-gray-400 sm:h-10 sm:w-10"
                                                    >
                                                        ...
                                                    </span>
                                                );
                                            }


                                            return (
                                                <Link
                                                    key={pageNumber}
                                                    href={`?page=${pageNumber}`}
                                                    className={`flex h-9 w-8 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 sm:h-10 sm:w-10 ${
                                                        validPage === pageNumber
                                                            ? 'bg-blue-600 text-white shadow-md'
                                                            : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                                    }`}
                                                >
                                                    {pageNumber}
                                                </Link>
                                            );

                                        })
                                    }

                                </div>


                                {/* NEXT */}
                                {
                                    validPage < totalPages ? (
                                        <Link
                                            href={`?page=${validPage + 1}`}
                                            className="flex h-9 items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600 sm:h-10 sm:px-4"
                                        >
                                            <span className="mr-1 hidden sm:inline">
                                                পরবর্তী
                                            </span>
                                            →
                                        </Link>
                                    ) : (
                                        <span
                                            className="flex h-9 cursor-not-allowed items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-300 sm:h-10 sm:px-4"
                                        >
                                            <span className="mr-1 hidden sm:inline">
                                                পরবর্তী
                                            </span>
                                            →
                                        </span>
                                    )
                                }

                            </div>

                        </div>
                    )
                }

            </section>

        </div>
    );
};

export default Category;
