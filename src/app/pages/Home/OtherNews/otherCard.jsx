import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const OtherCard = ({ news }) => {
    return (
        <div className="flex flex-col gap-10">

            {
                news.map((m, i) => {

                    return (
                        <section key={i}>

                            {/* SECTION HEADER */}
                            <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-3">

                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-1 rounded-full bg-blue-600"></div>

                                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                        {m.title}
                                    </h1>
                                </div>


                            </div>


                            {/* NEWS CARDS */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                                {
                                    m.articles.map((n, j) => {

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
                                            <Link key={j} href = {`/pages/Details/${n.id}`}>
                                            <article
                                                
                                                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                            >

                                                {/* IMAGE */}
                                                <figure className="relative h-48 w-full overflow-hidden sm:h-52">

                                                    <Image
                                                        src={n.imageUrl}
                                                        height={300}
                                                        width={400}
                                                        alt={n.title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />

                                                    {/* IMAGE OVERLAY */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"></div>

                                                    {/* CATEGORY */}
                                                    <div className="absolute bottom-3 left-3">
                                                        <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-md">
                                                            {n.category}
                                                        </span>
                                                    </div>

                                                </figure>


                                                {/* CONTENT */}
                                                <div className="p-4 sm:p-5">

                                                    {/* TITLE */}
                                                    <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-xl">
                                                        {n.title}
                                                    </h2>


                                                    {/* DESCRIPTION */}
                                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                                        {n.description}
                                                    </p>


                                                    {/* DATE */}
                                                    <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3">

                                                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>

                                                        <p className="text-xs font-medium text-gray-400 sm:text-sm">
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

                        </section>
                    );
                })
            }

        </div>
    );
};

export default OtherCard;
