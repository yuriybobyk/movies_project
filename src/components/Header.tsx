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
    const [isSearching, setIsSearching] = useState(false);

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
        if(!isSearching){
            setIsSearching(true);
        }else{
            if(searchQuery){
                navigate(`/search/${searchQuery}`)
                setSearchQuery('')
            }
            setIsSearching(false)
        }
    }
        
    

    return (
        <header className={`${isScrolled && 'bg-[#141414]'}`}>
            <div className="flex items-center space-x-2 md:space-x-10">
                {isMenuOpen ? <div>
                        <div className="w-8 h-8"/>
                        <LeftMenu isOpen={isMenuOpen} onClose={closeMenu}/></div> :
                    <MenuIcon onClick={toggleMenu} className="h-8 w-8 cursor-pointer"/>}
                <img src="https://rb.gy/ulxxee"
                     width={100}
                     height={100}
                     className="cursor-pointer object-contain" alt={'netflix'}
                     onClick={()=>navigate('/')}
                     />
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
                {isSearching && (
                    <input className="text-[#e5e5e5] border-solid outline-[#e5e5e5] px-2 py-1 bg-inherit border transition duration-700 placeholder:text-slate-100 md:w-40 sm:w-8 m-0 text-xs" type="text" value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} placeholder="type here to find movies"  onKeyPress={(e)=>{if(e.key === 'Enter'){handleSearch()}}} />
                )}
                <SearchIcon onClick={handleSearch} className="h-6 w-6 sm:inline cursor-pointer"/>
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