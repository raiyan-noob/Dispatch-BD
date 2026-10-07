import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#f5f8ff] px-5 py-16 sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-40 h-96 w-96 rounded-full bg-sky-200/70 blur-3xl" />
        <div className="absolute -right-28 -bottom-48 h-120 w-120 rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#64748b_0.7px,transparent_0.7px)] bg-size-[22px_22px] opacity-[0.24]" />
      </div>

      <section className="relative w-full max-w-5xl overflow-hidden rounded-4xl border border-white/80 bg-white/80 px-6 py-12 shadow-[0_24px_80px_-36px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:px-12 sm:py-16">
        <div aria-hidden="true" className="absolute right-8 top-8 hidden h-24 w-24 items-center justify-center rounded-full border border-blue-100 sm:flex">
          <div className="absolute h-16 w-16 rounded-full border border-dashed border-blue-300" />
          <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_0_8px_rgba(59,130,246,0.14)]" />
        </div>

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            পৃষ্ঠা খুঁজে পাওয়া যায়নি
          </span>

          <p aria-label="404" className="select-none text-[clamp(7rem,24vw,15rem)] font-black leading-[0.78] tracking-[-0.09em] text-slate-900">
            <span className="bg-linear-to-br from-slate-950 via-slate-700 to-blue-700 bg-clip-text text-transparent">4</span>
            <span className="relative mx-1 inline-block text-blue-600">
              0
              <span aria-hidden="true" className="absolute inset-[27%] rounded-full bg-white/80" />
            </span>
            <span className="bg-linear-to-br from-blue-600 to-sky-400 bg-clip-text text-transparent">4</span>
          </p>

          <h1 className="mt-8 font-(family-name:--font-noto-bengali) text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            এই পাতার কোনো ঠিকানা নেই
          </h1>
          <p className="mt-4 max-w-lg font-(family-name:--font-noto-bengali) text-base leading-8 text-slate-600 sm:text-lg">
            লিংকটি হয়তো বদলে গেছে, অথবা পাতাটি সরিয়ে ফেলা হয়েছে। চিন্তা নেই—সর্বশেষ খবরের খোঁজে ফিরে চলুন হোমপেজে।
          </p>

          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-blue-700 px-6 py-3.5 font-(family-name:--font-noto-bengali) text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-blue-800/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            <svg aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m0 0 7 7m-7-7 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            হোমপেজে ফিরে যান
          </Link>

          <p className="mt-8 font-(family-name:--font-noto-bengali) text-xs font-medium tracking-wide text-slate-400">
            DISPATCH BD <span className="mx-2 text-blue-500">•</span> খবরের সঙ্গে থাকুন
          </p>
        </div>
      </section>
    </main>
  );
}
