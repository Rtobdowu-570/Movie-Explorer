import React from 'react'
import {FaSearch} from 'react-icons/fa'
import '../styles/main.css'

const Navbar = () => {
  return (
    <>
    <nav className='main-nav'>
        <div className="right-nav">
            <ul className='right-nav-list'>
                <li><a className='head' href="#">MovieScope</a></li>
                <li><a href="#Home">Home</a></li>
                <li><a href="#">Movies</a></li>
                <li><a href="#">Tv Shows</a></li>
            </ul>

        </div>
        <div className="left-nav">
            <ul className='left-nav-list'>
                <li><FaSearch className='search-icon' /></li>
                <li><a href="#">Sign in</a></li>
            </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar