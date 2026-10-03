import React from 'react';
import Header from './header';
import NavLink from './navlink';
import Marquee from './Marquee';

const Navbar = () => {
    return (
        <div>
            <Header />
            <NavLink />
            <Marquee />
        </div>
    );
};

export default Navbar;