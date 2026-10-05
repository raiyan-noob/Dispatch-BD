import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import Link from 'next/link';
const Marquee = async() => {
    const res= await fetch("https://news-api-v2.vercel.app/api/news?limit=25")
    const data = await res.json();
    const headline= data.data;
     
    return (
        <div className="bg-blue-500 mt-2 px-2 text-grey-100">
        <div className="container mx-auto px-3 py-1 sm:px-4 flex items-center gap-2">
            <div className="font-bold mx-2">সর্বশেষ</div>
            <MarqueeText direction="right" duration={11} className="text-sm text-grey-100 sm:text-base md:text-sm">
            {
                headline.map((h,i) => <Link key={i} href={`/pages/Details/${h.id}`}>
                    <span>
                    <span className="hover:underline">
                        {h.title}
                    </span>
                    <span className="mx-4">•</span>
                    </span>
                </Link>
                )
            }
            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;