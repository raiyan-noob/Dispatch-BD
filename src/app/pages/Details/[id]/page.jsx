
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Details = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(
        `https://news-api-v2.vercel.app/api/article/${id}`,
        { cache: 'no-store' }
    );

    if (res.status === 404) {
        redirect('/error');
    }

    

    const result = await res.json();
    const news = result.data;

    if (!news) {
        redirect('/error');
    }

    const publishedDate = new Date(news.firstPublished);

    const date = publishedDate.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const time = publishedDate.toLocaleTimeString('bn-BD', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    // Extract description text from the API's structured blocks
    const description =
        typeof news.description === 'string'
            ? news.description
            : news.description?.blocks
                ?.flatMap((block) => block.model?.blocks || [])
                ?.map((block) => block.model?.text || '')
                ?.filter(Boolean)
                ?.join('\n\n') || '';

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-5xl px-3 py-6 sm:px-5 sm:py-10">

                {/* Breadcrumb */}
                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <Link
                        href="/"
                        className="transition-colors hover:text-blue-600"
                    >
                        হোম
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-blue-600">
                        {news.category || 'সংবাদ'}
                    </span>
                </div>

                {/* Article Container */}
                <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    {/* Article Header */}
                    <header className="px-4 pb-5 pt-6 sm:px-8 sm:pb-7 sm:pt-9">

                        {/* Source Badge */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                                {'Dispatch BD'}
                            </span>

                            {news.topics?.slice(0, 3).map((topic) => (
                                <span
                                    key={topic.id}
                                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                                >
                                    {topic.name}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-3xl md:leading-snug">
                            {news.title}
                        </h1>

                        {/* Description */}
                        {description && (
                            <p className="mt-5 border-l-4 border-blue-600 pl-4 text-base leading-8 text-gray-600 sm:text-md sm:leading-9">
                                {description}
                            </p>
                        )}

                        {/* Publication Info */}
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-5 text-sm text-gray-500">

                            <span className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-blue-600" />
                                {date}
                            </span>

                            <span>{time}</span>

                            {news.byline?.length > 0 && (
                                <span>
                                    প্রতিবেদক: {news.byline.join(', ')}
                                </span>
                            )}
                        </div>
                    </header>

                    {/* Main Image */}
                   

                    {/* Article Body */}
                    <div className="px-4 py-2 sm:px-8 sm:py-2">

                        <div className="mx-auto max-w-3xl space-y-6">

                            {news.body?.map((block, index) => {

                                if (block.type === 'text') {
                                    return (
                                        <p
                                            key={index}
                                            className="whitespace-pre-line text-base leading-8 text-gray-700 sm:text-md sm:leading-9"
                                        >
                                            {block.text}
                                        </p>
                                    );
                                }

                                if (block.type === 'subheading') {
                                    return (
                                        <h2
                                            key={index}
                                            className="border-l-4 border-blue-600 pl-4 pt-2 text-xl font-bold leading-snug text-gray-900 sm:text-2xl"
                                        >
                                            {block.text}
                                        </h2>
                                    );
                                }

                                if (block.type === 'image') {
                                    return (
                                        <figure
                                            key={index}
                                            className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-gray-50"
                                        >
                                            <div
                                                className="relative w-full"
                                                style={{
                                                    aspectRatio: `${block.width || 16} / ${block.height || 9}`,
                                                }}
                                            >
                                                <Image
                                                    src={block.url}
                                                    alt={block.altText || block.caption || news.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 768px"
                                                    className="object-contain"
                                                />
                                            </div>

                                            {block.caption && (
                                                <figcaption className="border-t border-gray-200 px-4 py-3 text-sm leading-relaxed text-gray-500">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    );
                                }

                                return null;
                            })}

                        </div>
                    </div>

                    {/* Article Footer */}
                    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-6 sm:px-8">

                        {/* Topics */}
                        {news.tags?.length > 0 && (
                            <div className="mb-5">
                                <h3 className="mb-3 text-sm font-bold text-gray-700">
                                    সংশ্লিষ্ট বিষয়
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {news.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-sm text-gray-600 transition-colors hover:border-blue-300 hover:text-blue-600"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    

                    </footer>
                </article>

                {/* Back to Home */}
                <div className="mt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                        <span aria-hidden="true">←</span>
                        হোমপেজে ফিরে যান
                    </Link>
                </div>

            </div>
        </main>
    );
};

export default Details;