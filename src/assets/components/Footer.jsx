import React from 'react'
import {FaTwitter, FaGithub, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
   <>
   <footer className='footer-container'>
        <div className="footer-text">
            <div className="footer-homepage-text"><h1>Movie Scope</h1></div>
            <div className="footer-subtext">
                <p>© 2024 Movie Scope. All rights reserved.</p>
            </div>
        </div>

        <div className="footer-links">
            <div className="footer-link">
                <a href="https://x.com/AndrewPete38959"><FaTwitter /></a>
                <a href="https://github.com/Rtobdowu-570"><FaGithub /></a>
                <a href="www.linkedin.com/in/fasasi-pamilerin-9901793a7"><FaLinkedin /></a>
            </div>
        </div>
   </footer>
   </>
  )
}

export default Footer