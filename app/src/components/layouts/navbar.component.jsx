import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"
import { NavLink } from 'react-router-dom'
import immutablePostLogo from '../../assets/logo-immutableposts@2x.png'


const { useDrizzle, useDrizzleState } = drizzleReactHooks;

const Navbar = () => {
    
    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const state = useDrizzleState(state => state);

    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance, 'ether');
        setBalance(baleth);
    }
    useEffect(() => {
        getBalance();

    }, []);

    return (
        <nav className="navbar drizzle-navbar navbar-expand-lg navbar-light">
            <div className="container">
            <a className="navbar-brand" href="/"><img src={immutablePostLogo} alt="Drizzle Logo" style={{height: '40px'}} /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/submit-your-post">Submit Your Post</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            <div className="ethamount">Wallet amount <strong>{balance} ETH</strong>.</div>
            </div>
            </nav>
    )
}

export default Navbar;





