import React from 'react';
import MainCard from './MainNews/mainNewsCard';
import OtherCard from './OtherNews/otherCard';
import LatestNews from './LatestNews/latest';
const News = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
        cache: "no-store",
    });
    const data = await res.json();
    const section = data.data;
    const main = section[0].articles;
    const snews = section[1].articles;
    const otherNews = section.slice(2);
    const otherFiltered = otherNews.filter(n => n.curationId !== "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137"
        &&
        n.curationId !== "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7"
        &&
        n.curationId !== "urn:bbc:vivo:curation:7375dbb6-8ca8-47af-8b2b-74f4260317c8"
        &&
        n.curationId !== "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267"
    )
    return (

<div className="container mx-auto px-3 py-1 sm:px-4">

    {/* MAIN NEWS + SIDE CONTENT */}
    <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">
            <MainCard news={main} snews={snews} />
        </div>

        {/* SIDE CONTENT */}
        <div className="w-full">
            <LatestNews />
        </div>

    </div>


    {/* OTHER NEWS */}
    <div className="mt-6">
        <OtherCard news={otherFiltered} />
    </div>

</div>


    );
};

export default News;