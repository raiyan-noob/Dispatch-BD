import React from 'react';
import NavLinkClient from './NavLinkClient';

const NavLink = async() => {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");
    const data = await res.json();
    const nav = data.data;
    const filterNav = nav.filter(n => n.scrapable);

    return (
        <NavLinkClient filterNav={filterNav} />
    );
};
export default NavLink;