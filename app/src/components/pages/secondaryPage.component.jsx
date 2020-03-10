import React, { useState, useEffect } from 'react'
import { drizzleReactHooks } from "@drizzle/react-plugin"
import Swal from 'sweetalert2'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function SecondaryPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [thefee, setFee] = useState(0);
    const [showStep1, setShowStep1] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    


    const state = useDrizzleState(state => state);

    const stateApp = {
        storedTitle: '',
        storedDescription: '',
        storedCategory: '',
        storedName: '',
        storedBio: '',
        storedLink: '',

    };

    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
       // const balance = await drizzle.contracts.ImmutablePosts.methods.get().call();
        setBalance(baleth);
    }

    async function getFee() {
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
        const thefees = drizzle.web3.utils.fromWei(thefee,'ether');
        setFee(thefees);
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


    const gotostep = (e) => {
        setShowStep2(!showStep2);
        setShowStep1(!showStep1);
    }

    const saveStoredData = async () => {

        //getting the fee from the contract
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
        
        //getting the wallet address to share the fee
        const btSubmitElement = document.getElementById('submit-bt');
        const storedWalletPlugin = btSubmitElement.getAttribute('data-sharewallet');


        //getting author information and adding author to the post
        const transactionauthor = await drizzle.contracts.ImmutablePosts.methods
            .createAuthor(stateApp['storedName'],stateApp['storedBio'],stateApp['storedLink'])
            .send({from: state.accounts[0], gas:3000000});

        //posting the article to the blockchain
        const transaction = await drizzle.contracts.ImmutablePosts.methods
            .createPostandPay(stateApp['storedTitle'],stateApp['storedDescription'],stateApp['storedCategory'],storedWalletPlugin)
            .send({from: state.accounts[0], value: drizzle.web3.utils.toWei(thefee, "wei"), gas:3000000});
        
        if(transaction.status && transactionauthor.status) {
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
                <strong>Post your Immutable Article</strong><br/>
                <small>Cost of the post: {thefee} ETH</small>
            </h5>
            <div className="container">
                
                <form onSubmit={handleSubmit}>
                {showStep1 &&
                    <div id="formsection-step1">  
                           {/* Post info  */}
                            <h4>Create your post</h4>
                            <div className="form-group">
                                <label htmlFor="storedTitle">Title</label>
                                <input type="text" className="form-control" id="storedTitle" onChange={handleChange} placeholder="Title" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedDescription">Description</label>
                                <textarea className="form-control" id="storedDescription" onChange={handleChange} placeholder="Description" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedCategory">Category</label><br/>
                                <select id="storedCategory" onChange={handleChange} required>
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
                            <hr/>
                            <div className="nav-form">
                                <button className="btn btn-primary rightaligned" onClick={gotostep}>Next</button>
                            </div>
                            
                        </div>
                         } 
                        {showStep2 &&
                        <div id="formsection-step2"> 
                          
                        {/* Author info  */}
                        <h4>A bit about yourself</h4>
                        <div className="form-group">
                            <label htmlFor="storedTitle">Your name</label>
                            <input type="text" className="form-control" id="storedName" onChange={handleChange} placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="storedTitle">Your bio</label>
                            <textarea className="form-control" id="storedBio" onChange={handleChange} placeholder="Bio"required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="storedTitle">Your website(link)</label>
                            <input type="text" className="form-control" id="storedLink" onChange={handleChange} placeholder="Link" />
                        </div>
                          <hr/>
                            {/* Invoice info  */}
                            {/* <h4>Information for billing/invoice</h4> */}
                            <div className="form-group">
                                <label htmlFor="storedDescription">Company name</label>
                                <input type="text" className="form-control" id="storedCompname" onChange={handleChange} placeholder="Company Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedDescription">Company address</label>
                                <input type="text" className="form-control" id="storedCompaddress" onChange={handleChange} placeholder="Company Address" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedDescription">Company contact name</label>
                                <input type="text" className="form-control" id="storedCompcontactname" onChange={handleChange} placeholder="Company Contact Name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedDescription">Company phone</label>
                                <input type="tel" className="form-control" id="storedCompphone" onChange={handleChange} placeholder="Company Phone" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedDescription">Company email</label>
                                <input type="email" className="form-control" id="storedCompemail" onChange={handleChange} placeholder="Company Email" required />
                            </div>
                            <hr/>
                            <div className="nav-form">
                               <button className="btn btn-primary" onClick={gotostep}>Prev</button>
                               <button type="submit" className="btn btn-primary rightaligned" onClick={saveStoredData} id="submit-bt" data-sharewallet="0x99B51c553198c089E739FC4131dc98b42Bc391fa">Submit Post</button>
                            </div>
                           
                        </div>
                        }
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