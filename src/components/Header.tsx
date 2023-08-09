import React, {useEffect, useState} from 'react';
import {Menu} from "./Menu";
import {BellIcon, SearchIcon} from "@heroicons/react/solid";
import {Link} from "react-router-dom";


const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md: space-x-10">
                <img src="https://rb.gy/ulxxee"
                     width={100}
                     height={100}
                     className="cursor-pointer object-contain" alt={'netflix'}/>
                <Menu/>
                <ul className="hidden space-x-4 md:flex">
                    <Link to={'/'} className="headerLink">Home</Link>
                    <Link to={'/tvshows'} className="headerLink">TV Shows</Link>
                    <Link to={'/movies'} className="headerLink">Movies</Link>
                    <Link to={'/new&popular'} className="headerLink">New & Popular</Link>
                    <li className="headerLink">My List</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 text-sm font-light">
                <SearchIcon className="hidden h-6 w-6 sm:inline"/>
                <p className="hidden lg: inline">Kids</p>
                <BellIcon className="h-6 w-6"/>
                <Link to={'/account'}>
                    <img src="https://rb.gy/g1pwyx"
                         alt=""
                         className="cursor-pointer rounded"/>
                </Link>
            </div>
        </header>
    );
};

export {Header}
