import React from "react";
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

function LoadingContainer({children}) {
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
    if(drizzleStatus.initialized === false) {
        return (
            <main className="drizzle-loader-container">
                <img src={immutablePostLoading} alt="Drizzle Logo" style={{ height: '100px' }} />
                <div className="drizzle-loader-text">Loading...</div>
            </main>
        )
    } return(
        <>
            { children }
        </>
    );
}

export default LoadingContainer;