import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"
import { NavLink } from 'react-router-dom'
import immutablePostLogo from '../../assets/logo-immutableposts@2x.png'
import fs from "fs";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from 'fortmatic';
import Squarelink from "squarelink";

const { useDrizzle, useDrizzleState } = drizzleReactHooks;


const Navbar = () => {
    
   
    const { drizzle } = useDrizzle();

    

   
    const [balance, setBalance] = useState();
    const [accountinfo, setAccountinfo] = useState();

    const [web3provider, setWeb3] = useState();
    const state = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);

    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider, // required
            options: {
                infuraId: "159beab8ddc94e4fadf540f13abca684" // required
            }
        },
        fortmatic: {
            package: Fortmatic, // required
            options: {
                key: "pk_test_BA2F29C8A4846EA4" // required
            }
        },
        squarelink: {
            package: Squarelink, // required
            options: {
                id: "f9505d15054e8406cd5c" // required
            }
        }
    };
    const web3Modal = new Web3Modal({
        network: "ropsten", // optional
        cacheProvider: false, // optional
        providerOptions // required
    });

    async function loadConnector() {
        web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();
        if (provider) {
            setWeb3(new Web3(provider))
            const web3 = new Web3(provider);
            console.log(provider);
            //alert(web3.currentProvider.host);
            //const balance = Web3.eth.getBalance(state.accounts[0]);
            //const baleth = Web3.utils.fromWei(balance, 'ether');
            //var tokenBalance = parseFloat(baleth);
            //tokenBalance = tokenBalance.toFixed(5);
            //setBalance(baleth);
        }

    }   
    const gotowallet = (e) => {
        loadConnector();
    } 
    async function checkProvider() {
        web3Modal.clearCachedProvider();
        if (web3Modal.cachedProvider) {
            const provider = await web3Modal.connect();
            console.log(provider);
            setWeb3(new Web3(provider))
            const web3js = new Web3(provider);
        }
    }
        async function getBalance() {
            //let isUserLoggedIn = await fm.user.isLoggedIn();
           
           const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
            const baleth = drizzle.web3.utils.fromWei(balance, 'ether');
            //var tokenBalance = parseFloat(baleth);
            //tokenBalance = tokenBalance.toFixed(5);
            setBalance(baleth);
           
        }
        async function getUser() {
            const accountinfo = await drizzle.web3.eth.getAccounts();
            setAccountinfo(accountinfo);
           
        }
   
    useEffect(() => {
        checkProvider()
        if (web3provider) {
            getBalance();
            getUser();
        }

    }, []);

    return web3provider ? (
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
                              
                            </ul>
                        </div>
                        <div className="ethamount"><button className="btn btn-primary" onClick={gotowallet}>Connect Wallet</button></div>
                    </div>
                </nav>
            </div>  
        
    )

  

}


export default Navbar;





