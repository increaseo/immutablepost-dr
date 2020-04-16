import React from "react";
import Web3 from "web3";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import Lottie from 'react-lottie'
import animationData from './assets/drizzleLogo.json'
import immutablePostLoading from './assets/loading.gif'

const { useDrizzleState } = drizzleReactHooks;

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        className: 'drizzle-loader'
    }
};



function LoadingContainer({ children }) {
       
    
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    console.log(drizzleStatus);
    if (drizzleStatus.initialized === false) {
        return (
           
            <main className="drizzle-loader-container">
                {/* <button className="btn btn-primary" onClick={gotowallet}>Connect your wallet</button>*/} 
             <img src={immutablePostLoading} alt="Drizzle Logo" style={{ height: '100px' }} />
                <div className="drizzle-loader-text">Loading...</div> 

            </main>
        )
    } return (
        <>
            {children}
        </>
    );
}
export default LoadingContainer;