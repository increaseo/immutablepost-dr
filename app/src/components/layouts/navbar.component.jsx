import React, { useState, useEffect } from 'react';
import { Drizzle } from "@drizzle/store";
import { drizzleReactHooks } from "@drizzle/react-plugin"
import { NavLink } from 'react-router-dom'
import immutablePostLogo from '../../assets/logo-immutableposts@2x.png'
import { Image, Button, Modal } from 'react-bootstrap';


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
    const [networkinfo, setNetwork] = useState();
    const [web3provider, setWeb3] = useState();
    const state = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    const [showModal, setModal] = useState(false);

    const handleClose = () => setModal(false);
    const handleShow = () => setModal(true);
    // const providerOptions = {
    //     walletconnect: {
    //         package: WalletConnectProvider, // required
    //         options: {
    //             infuraId: "159beab8ddc94e4fadf540f13abca684" // required
    //         }
    //     },
    //     fortmatic: {
    //         package: Fortmatic, // required
    //         options: {
    //             key: "pk_test_BA2F29C8A4846EA4" // required
    //         }
    //     },
    //     squarelink: {
    //         package: Squarelink, // required
    //         options: {
    //             id: "f9505d15054e8406cd5c" // required
    //         }
    //     }
    // };
    // const web3Modal = new Web3Modal({
    //     network: "ropsten", // optional
    //     cacheProvider: true, // optional
    //     providerOptions // required
    // });

    // async function loadConnector() {
    //     //web3Modal.clearCachedProvider();
    //     const provider = await web3Modal.connect();
    //     if (provider) {
    //         setWeb3(new Web3(provider))
    //         const web3 = new Web3(provider);
    //         drizzle.web3 = web3;
            
    //         getUser();
    //         getBalance();
    //         // console.log(drizzle.web3);
    //         // console.log(web3);
    //         // console.log(provider);

    //         //const options = { customProvider: new Web3(provider) };
    //         //const drizzle = new Drizzle(options);
    //         //window.web3.currentProvider = new Web3(provider);
    //         //alert(web3.currentProvider.host);
    //         //const balance = Web3.eth.getBalance(state.accounts[0]);
    //         //const baleth = Web3.utils.fromWei(balance, 'ether');
    //         //var tokenBalance = parseFloat(baleth);
    //         //tokenBalance = tokenBalance.toFixed(5);
    //         //setBalance(baleth);
    //     }

    // }   
    // const gotowallet = (e) => {
    //     loadConnector();
    // } 
    // async function checkProvider() {
    //     //web3Modal.clearCachedProvider();
    //     if (web3Modal.cachedProvider) {
    //         const provider = await web3Modal.connect();
    //         console.log(provider);
    //         setWeb3(new Web3(provider))
    //         const web3 = new Web3(provider);
    //         drizzle.web3 = web3;
    //         getUser();
    //         getBalance();
            
    //     }
    // }

       
        async function getBalance(user) {
            const useraccount = await getUser();
            console.log(useraccount[0]);
            var stringaccount = useraccount[0].toString();
            const balance = await drizzle.web3.eth.getBalance(stringaccount);
            console.log(balance);
            const baleth = drizzle.web3.utils.fromWei(balance, 'ether');
            var tokenBalance = parseFloat(baleth);
            tokenBalance = tokenBalance.toFixed(5);
            setBalance(tokenBalance);
           
        }
        async function getUser() {
            const accountinfos = await drizzle.web3.eth.getAccounts();
            setAccountinfo(accountinfos);
            return accountinfos;     
        }
        async function checkMetamask() {
            const network = await drizzle.web3.eth.net.getNetworkType();
            console.log(network);
            setNetwork(network);
            if (typeof web3 !== 'undefined') {
                // Use Mist/MetaMask's provider.
                //web3js = new Web3(web3.currentProvider);
                getUser();
                getBalance();
            } else {
                
                // Handle the case where the user doesn't have web3. Probably 
                // show them a message telling them to install Metamask in 
                // order to use the app.
            }
            
        }  

       const gotometamask = (e) => {
           window.open('https://metamask.io/', '_blank');
           //window.location.href = "https://metamask.io/";
        } 
    useEffect(() => {
        checkMetamask();
        //checkProvider()
        //if (accountinfo) {
            //getUser();
            //getBalance();
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
                            <NavLink className="nav-link" to="/submit-your-post">Submit post</NavLink>
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
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div class="bn-onboard-custom bn-onboard-icon-display svelte-18zts4b">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAMAAACl6XjsAAABfVBMVEVHcEx/Rh2ARx2ESiLwiCLMu67cfCagZDOddlJ+Rx7pgiPlfyPshSN/Rxx+Rh2CSB6ASB2JTR7gkkl1SCbQciPUwLLMu6+BSB5/Rx2DSR5+RxzefR3ogCPlfiPGuLHhfiP2jCTvhyN/Rx3nfyPfo2/lfCTIuK7kfyP2jCPkfiPuhSTFtKjogSThfCR/Rx5+Rx3lfiPeeiTDs6koIR2DSh/ifCajWx6qYCDckVOBSR7jfiTyiCOYYTXLcCKpXiHEs6fDs6fCsKYjHBwhHx8iHR0iICB1a2ZyaGIiHyCPTx7ogSTlfyTwhyOASB7ziSTngCTrgyT2jCTthCT1iyPuhCX4jSSESh5/Rx6ITR/+kSTYbyDheSLjfSPBaiPacSDdcyCvYSK0ZCGTVSPGcSblhi/ngSPqgSTdu56mXSDaeSP6jiPmfSD5jSQcGhvimFdqUj/TbSJARUsyQE6tbDLOeyzZx7nayr7hsog7Nza/raDjjUF/VTjFtKhKNCB0amRMd0DeAAAASnRSTlMAe/oOkv4TAwgrpnA9n1n9vkYfHPv+xu2r9mgN6uI4Us5ji/n9Ln7G7pO61/K35ZXYiUji5s21zMnb0/r5aMipm2UkYjSGnPy0/l1QcU4AAALOSURBVHhehdJXXxpNFAbwBYIgoICCIKhgi91ETe/9fZ3ZXui92bvp5bPnzCwzK79c+Fxws3/mOXN2BSe+0Tnh1oBKTI7eqvypSUnaHP4XDIVeRn1cucKSJIUj4wMF6cVgYDr2KsrVXE4imUx6mEmHgoH786ZZ3b3H/usZAWW7R3fsAFFNhCrVwmaKdY4ylZdaqEgjI4yxUm7mpAjvjABjbt/QIIZJ1MF+Pu+eY3MMuwEwl2sfEidiBcdaeUl6yrcEkzks38IWMBnG2gUVTrIljSco4LUNGZxRaeZASW4X63Q5hznHyTGqpAfRwU5+WKGtaxC1SQsSKb+tfOyeTHWRDEyuNGhpf7me5EBjoYowFoEZ+gFx7pH+FYaTA0qBfSG6ErI2KcxZJMxVDhSkS1sV4twuNls0wVi4CYpEJ6yHwXEmpHJ5OxJTGNHhMLjH/BP0uQp2GpTwVhHY+orAExLt9ChxWhFWprYcFihaNKLDegZt7U4FuRpbPtbssONgRNECVjm6wYJFrR+5XK/VavVa9byO4L3qpWqMl/qznGlipV46b5xdturYIK//54sND7sAR3SnlfbZxeVFFYkw3MHV9dIQv8CAQ7qlXl+1kUoO78mMsQvwXiRbh8VjEenEqat9NlvUBmLJol2v6jDe89U0Vb7sDQa7k/UjxZSp04mjpw1ewBBRuV6qVbCCRFmzNNE0rOVZP2EZE9F0u10F10qQsr1hVTQ0WTSs7KwP2NA0wjxlUHWCmJRlo5jNELdlYidQaR92RINRp1P4vfPxnSAszis3XLkMD3Gn8+P0dGHh697e3vdvJyf/f4CrLqm8xFx/+IQ+jH/+QgK/wHbek9ZZwhSkq1MbwUW/f+buRJyIfn79+e/TuGBfomfi6UBmjH3NIL19Ffd6J2YEmhX92UqGbpEHzlzzeuNxL6ht9lmG0g5w5PbrtbWJN2/HyGB/AYd1QUewqrrRAAAAAElFTkSuQmCC" srcset="data:image/png;base64,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" alt="MetaMask" class="svelte-18zts4b" /> 
                            <span class="svelte-18zts4be">Setup MetaMask</span>
                            </div>
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You'll need to install MetaMask to continue. Once you have it installed, go ahead and refresh the page.</p>
                        <p>Make sure to select Ropsten Network to use our dApp for the moment. Thanks!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                         </Button>
                        <Button variant="primary" onClick={gotometamask}>
                            Install Metamask
                        </Button>
                    </Modal.Footer>
                </Modal>
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
                                    <NavLink className="nav-link" to="/submit-your-post">Submit post</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </li>
                              
                            </ul>
                        </div>
                        <div className="ethamount"><button className="btn btn-primary" onClick={handleShow}>Connect Wallet</button></div>
                        {/* <div className="ethamount"><button className="btn btn-primary" onClick={gotowallet}>Connect Wallet</button></div> */}
                    </div>
                </nav>
            </div> 

        
    )

  

}


export default Navbar;





