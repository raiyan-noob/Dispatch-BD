import Link from 'next/link';

export default function ArticleErrorPage() {
    return (
        <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-6xl font-bold text-blue-600">404</p>
            <h1 className="mt-4 text-2xl font-bold text-gray-900">
                সংবাদটি খুঁজে পাওয়া যায়নি
            </h1>
            <p className="mt-2 max-w-md text-gray-600">
                সংবাদটি সরিয়ে ফেলা হয়ে থাকতে পারে অথবা লিংকটি ভুল হতে পারে।
            </p>
            <Link
                href="/"
                className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
            >
                হোমপেজে ফিরে যান
            </Link>
        </main>
    );
}
