import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function ArticleDetails() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const state = useDrizzleState(state => state);
    
    const {idnm} = drizzle.props;
    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
        setBalance(baleth);
    }

    useEffect(() => {    
        getBalance();
    }, []);

    return balance ? (
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Article Detail</strong>
            </h5>
            <div className="container">
                <p>Content of the Article </p>
            </div>
        </div>
   
   ) : (
    <div className="section">
        <h5 className="section-header info-color white-text text-center py-4">
            <strong>Loading...</strong>
        </h5>
    </div>
);
}