import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"
import { NavLink } from 'react-router-dom'
import immutablePostLogo from '../../assets/logo-immutableposts@2x.png'
import Fortmatic from 'fortmatic';
const fm = new Fortmatic('pk_test_BA2F29C8A4846EA4', 'ropsten');

const { useDrizzle, useDrizzleState } = drizzleReactHooks;


const Navbar = () => {
    
   
    const { drizzle } = useDrizzle();

    

   
    const [balance, setBalance] = useState();
    const [accountinfo, setAccountinfo] = useState();
    const state = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);


        async function getBalance() {
            //let isUserLoggedIn = await fm.user.isLoggedIn();
           
           const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
            const baleth = drizzle.web3.utils.fromWei(balance, 'ether');
            var tokenBalance = parseFloat(baleth);
            tokenBalance = tokenBalance.toFixed(5);
            setBalance(tokenBalance);
           
        }
        async function getUser() {
            const accountinfo = await drizzle.web3.eth.getAccounts();
            setAccountinfo(accountinfo);
           
        }
   
    useEffect(() => {
        console.log(drizzleStatus.initialized);
       //if (drizzleStatus.initialized !== false) {
         getBalance();
         getUser();
       // }

    }, []);

    return balance ? (
        <div>
            <div className="container">
                <div className="toptestnav">
                <p>Our project is currently on the Ropsten Test Network. Your Wallet Address is: {accountinfo}</p>
                <p>Request some Test Ether <a href="https://faucet.ropsten.be/" target="_blank">here</a></p></div>
            </div>
        
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
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li> */}
                    </ul>
                </div>
                <div className="ethamount">Wallet amount <strong>{balance} ETH</strong>.</div>
            </div>
            </nav>
        </div>   
    ) : (
            <div>
                <div className="container">
                    <div className="toptestnav">
                        <p>Our project is currently on the Ropsten Test Network. You need to connect your wallet first.</p></div>
                </div>

                <nav className="navbar drizzle-navbar navbar-expand-lg navbar-light">
                    <div className="container">
                        <a className="navbar-brand" href="/"><img src={immutablePostLogo} alt="Drizzle Logo" style={{ height: '40px' }} /></a>
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
                        <div className="ethamount">No Wallet connected.</div>
                    </div>
                </nav>
            </div>  
        
    )

  

}


export default Navbar;





