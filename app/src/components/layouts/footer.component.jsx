import React from 'react'
import { NavLink } from 'react-router-dom'
import drizzleLogo from '../../assets/drizzleLogo.svg'

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
                    </ul>
                    <div className="copyright">Built on the blockchain by <a href="https://www.increaseo.com" target="_blank" rel="nofollow">Increaseo</a> - @copyright ImmutablePost 2020</div>
                </div>
            </div>    
       </footer>
        
    )
}

export default Footer;





