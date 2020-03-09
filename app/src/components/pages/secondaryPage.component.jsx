import React, { useState, useEffect } from 'react'
import { drizzleReactHooks } from "@drizzle/react-plugin"
import Swal from 'sweetalert2'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function SecondaryPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance, setFee, thefee] = useState();
    const state = useDrizzleState(state => state);

    const stateApp = {
        storedTitle: 'Title',
        storedDescription: 'Description',
        storedCategory: 'Arts & Entertainment'

    };

    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
       // const balance = await drizzle.contracts.ImmutablePosts.methods.get().call();
        setBalance(baleth);
    }

    async function getFee() {
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
    }


    useEffect(() => {    
        getBalance();
        getFee();
    }, []);

  

    const handleChange = (e, x) => {
        stateApp[e.target.id] = e.target.value;
        
    }
   

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const saveStoredData = async () => {

        //getting the fee from the contract
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
        
        //getting the wallet address to share the fee
        const btSubmitElement = document.getElementById('submit-bt');
        const storedWalletPlugin = btSubmitElement.getAttribute('data-sharewallet');

        //posting the article to the blockchain
        const transaction = await drizzle.contracts.ImmutablePosts.methods
            .createPostandPay(stateApp['storedTitle'],stateApp['storedDescription'],stateApp['storedCategory'],storedWalletPlugin)
            .send({from: state.accounts[0], value: drizzle.web3.utils.toWei(thefee, "wei"), gas:3000000});
        
        if(transaction.status) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your Post Has Been Made Immutable!',
                type: 'success',
                confirmButtonColor: '#e911bd',
            }).then(function() {
                window.location = "/";
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Opps!',
                text: 'Error updating Post Data!',
                type: 'error',
                confirmButtonColor: '#e911bd',
            });
        }
    }

    return balance ? (
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Post your Immutable Article</strong>
            </h5>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="storedTitle">Title {thefee}</label>
                        <input type="text" className="form-control" id="storedTitle" onChange={handleChange} placeholder="Title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="storedDescription">Description</label>
                        <textarea className="form-control" id="storedDescription" onChange={handleChange} placeholder="Description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="storedCategory">Category</label><br/>
                        <select id="storedCategory" onChange={handleChange}>
                            <option value="Arts & Entertainment">Arts & Entertainment</option>
                            <option value="Business">Business</option>
                            <option value="Careers">Careers</option>
                            <option value="Computers">Computers</option>
                            <option value="Engineering & Technology">Engineering & Technology</option>
                            <option value="Environment">Environment</option>
                            <option value="Fashion">Fashion</option>
                            <option value="Finance">Finance</option>
                            <option value="Food & Beverage">Food & Beverage</option>
                            <option value="Health & Fitness">Health & Fitness</option>
                            <option value="Hobbies">Hobbies</option>
                            <option value="Home & Family">Home & Family</option>
                            <option value="Internet">Internet</option>
                            <option value="Jobs">Jobs</option>
                            <option value="Management">Management</option>
                            <option value="Pets & Animals">Pets & Animals</option>
                            <option value="Politics">Politics</option>
                            <option value="Reference & Education">Reference & Education</option>
                            <option value="Review">Review</option>
                            <option value="Science">Science</option>
                            <option value="Self Improvement">Self Improvement</option>
                            <option value="Society">Society</option>
                            <option value="Sports & Recreation">Sports & Recreation</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Travel & Leisure">Travel & Leisure</option>
                            <option value="Writing & Speaking">Writing & Speaking</option>
                        </select> 
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={saveStoredData} id="submit-bt" data-sharewallet="0x99B51c553198c089E739FC4131dc98b42Bc391fa">Submit Post</button>
                </form>
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