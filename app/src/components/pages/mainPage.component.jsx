import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function MainPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const state = useDrizzleState(state => state);

    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
       // const balance = await drizzle.contracts.ImmutablePosts.methods.get().call();
        setBalance(baleth);
    }

    useEffect(() => {    
        getBalance();
    }, []);

    return balance ? (
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Immutable Posts</strong>
            </h5>
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="storedData">Your have in your account (in ETH)</label>
                        <input type="number" className="form-control" id="storedData" placeholder={balance} readOnly/>
                    </div>
                </form>
                <div><a href="/category/post-name">Test Link</a></div>
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