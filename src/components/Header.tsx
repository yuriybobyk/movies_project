import React, {useEffect, useState} from 'react';
import {Menu} from "./Menu";
import {BellIcon, MenuIcon, SearchIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {LeftMenu} from "./LeftMenu";
import useAuth from "../hooks/useAuth";


const Header = () => {

    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {logout} = useAuth()
    const [searchQuery, setSearchQuery] = useState('');

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

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    const navigate = useNavigate();

    const handleSearch = ()=>{
        if(searchQuery){
            navigate(`/search/${searchQuery}`)
        }
    }


    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md: space-x-10">
                {isMenuOpen ? <div>
                        <div className="w-8 h-8"/>
                        <LeftMenu isOpen={isMenuOpen} onClose={closeMenu}/></div> :
                    <MenuIcon onClick={toggleMenu} className="h-8 w-8 cursor-pointer"/>}
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
                <input className="font-black text-black" type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder="Type here to find movies"/>
                <SearchIcon onClick={handleSearch} className="hidden h-6 w-6 sm:inline"/>
                <p className="hidden lg: inline">Kids</p>
                <BellIcon className="h-6 w-6"/>
                {/*<Link to={'/account'}>*/}
                    <img src="https://rb.gy/g1pwyx"
                         alt=""
                         className="cursor-pointer rounded"
                        onClick={logout}
                    />

                {/*</Link>*/}
            </div>
        </header>
    );
};

export {Header}
