import React from 'react'
import { NavLink } from 'react-router-dom'
import twitterLogo from '../../assets/twitter-icon.png'
import facebookLogo from '../../assets/facebook-icon.png'
const Footer = () => {
    return (
       <footer>
            <div className="container">
                <div className="footer-nav">
                    <ul className="navbar-footer">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/privacy">Privacy</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/terms">Terms of Use</NavLink>
                        </li>
                        <li className="nav-item">
                            <a href="https://twitter.com/immutablepost" target="_blank"><img src={twitterLogo} className="footericon" /></a>
                        </li>
                        <li className="nav-item">
                            <a href="https://www.facebook.com/immutablepost" target="_blank"><img src={facebookLogo} className="footericon" /></a>
                        </li>

                    </ul>
                    <div className="copyright">Built on the blockchain by <a href="https://www.increaseo.com" target="_blank" rel="nofollow">Increaseo</a> - @copyright ImmutablePost 2020</div>
                </div>
            </div>    
       </footer>
        
    )
}

export default Footer;





