import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const MainCard = ({ news, snews }) => {
    const [firstnews, ...restNews] = news;
    const [...restSnews] = snews;

    // Main news date
    const publishedDate = new Date(firstnews.firstPublished);

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

        <div className="flex flex-col gap-10">

            {/* MAIN NEWS */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                {/* Featured News */}
                <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:col-span-2">
                    <Link href={`/pages/Details/${firstnews.id}`}>
                    <figure className="relative h-60 w-full overflow-hidden sm:h-72 md:h-96">
                        <Image
                            src={firstnews.imageUrl}
                            height={300}
                            width={400}
                            alt="firstNews"
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                        <div className="absolute bottom-4 left-4">
                            <span className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm sm:text-sm">
                                {firstnews.category}
                            </span>
                        </div>
                    </figure>

                    <div className="p-5 sm:p-6">

                        <h2 className="text-xl font-bold leading-tight text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-2xl md:text-3xl">
                            {firstnews.title}
                        </h2>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-600 sm:text-base">
                            {firstnews.description}
                        </p>

                        <p className="mt-4 text-xs font-medium text-gray-400 sm:text-sm">
                            {date}
                        </p>

                    </div>
                    </Link>
                </div>


                {/* SIDE NEWS */}
                <div className="flex flex-col divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-4 shadow-sm">

                    {
                        restNews.slice(0, 4).map((n, index) => (
                            <div
                                className="group cursor-pointer py-4 first:pt-5 last:pb-5"
                                key={index}
                            >
                                    <Link href={`/pages/Details/${n.id}`}>
                                <p className="mb-1 text-xs font-semibold text-blue-600 sm:text-sm">
                                    {n.category}
                                </p>

                                <h3 className="text-base font-bold leading-snug text-gray-800 transition-colors duration-200 group-hover:text-blue-600 sm:text-lg">
                                    {n.title}
                                </h3>
                            </Link>
                            </div>
                        ))
                    }

                </div>
            </div>


            {/* SECTION TITLE */}
            <div>

                <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-3">

                    <div className="h-7 w-1 rounded-full bg-blue-600"></div>

                    <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                        {restSnews[0].category}
                    </h1>

                </div>


                {/* SECONDARY NEWS */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {
                        snews.map((n, i) => {

                            // Each secondary news gets its own API date
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
                                <Link key={i} href = {`/pages/Details/${n.id}`}>
                                <div
                                    
                                    className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <figure className="relative h-48 w-full overflow-hidden sm:h-52">

                                        <Image
                                            src={n.imageUrl}
                                            height={300}
                                            width={400}
                                            alt="news"
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                                        <div className="absolute bottom-3 left-3">
                                            <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
                                                {n.category}
                                            </span>
                                        </div>

                                    </figure>


                                    <div className="p-4 sm:p-5">

                                        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-xl">
                                            {n.title}
                                        </h2>

                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                            {n.description}
                                        </p>

                                        <p className="mt-4 text-xs font-medium text-gray-400 sm:text-sm">
                                            {date}
                                        </p>

                                    </div>

                                </div>
                                </Link>
                            );
                        })
                    }

                </div>

            </div>

        </div>
    );
};

export default MainCard;


