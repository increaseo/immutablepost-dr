import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import immutablePostLogo from './assets/logo-immutableposts@2x.png'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from 'fortmatic';





function WelcomeContainer({ children }) {
   
    const [web3, setWeb3] = useState();


    const providerOptions = {
        // walletconnect: {
        //     package: WalletConnectProvider, // required
        //     options: {
        //         infuraId: "159beab8ddc94e4fadf540f13abca684" // required
        //     }
        // },
        fortmatic: {
            package: Fortmatic, // required
            options: {
                key: "pk_test_BA2F29C8A4846EA4" // required
            }
        }
    };
    const web3Modal = new Web3Modal({
        network: "ropsten", // optional
        cacheProvider: true, // optional
        providerOptions // required
    });

    async function loadConnector() {
        web3Modal.clearCachedProvider();
        const provider = await web3Modal.connect();
        if (provider) {
            setWeb3(new Web3(provider))
        }


    }   
    const gotowallet = (e) => {
        loadConnector();
    } 
    async function checkProvider() {
      
        if (web3Modal.cachedProvider) {
            const provider = await web3Modal.connect();
            setWeb3(new Web3(provider))
        }
    }

    useEffect(() => {
        checkProvider()

    }, []);

    return web3 ? (
        <>
            {children}
        </>
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
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/submit-your-post">Submit Your Post</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">About</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="ethamount">No Wallet connected.</div>
                    </div>
                </nav>
                <div className="front">
                    <div className="front-landing-intro">
                        <div className="container content-frontintro">
                            <h2 className="section-header info-color white-text py-4">
                                <strong>Welcome to Immutable Posts </strong>
                            </h2>
                            <p>Publish your content onto the blockchain where it is stored immutably</p>
                            <button className="btn btn-primary" onClick={gotowallet}>Connect your wallet</button>
                        </div>
                    </div>
                    <div className="container list-posts">

                        <button className="btn btn-primary" onClick={gotowallet}>Connect your wallet</button>
                    </div>
                </div>   
              </div>  
        
    );
}
export default WelcomeContainer;