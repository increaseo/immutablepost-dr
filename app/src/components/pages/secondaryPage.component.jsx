import React, { useState, useEffect } from 'react'
import Countries from 'react-select-country';
//import Select from 'react-select'
//import countryList from 'react-select-country-list'
import immutablePostLoading from '../../assets/loading.gif';
import { drizzleReactHooks } from "@drizzle/react-plugin"
import emailjs from 'emailjs-com';
import ipfs from "../../ipfs.js"
import Swal from 'sweetalert2'


import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from 'fortmatic';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function SecondaryPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [accountinfo, setAccountinfo] = useState();
    const [buffer, setBuffer] = useState();
    const [ipfsHash, setipfsHash] = useState();
    const [thefee, setFee] = useState(0);
    const [networkinfo, setNetwork] = useState();
    const [showStep1, setShowStep1] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [nameError, setNameError] = useState(null);
    const [nameErrorDesc, setNameErrorDesc] = useState(null);
    const [nameErrorName, setNameErrorName] = useState(null);
    const [nameErrorBio, setNameErrorBio] = useState(null);
    const [nameErrorCompName, setNameErrorCompName] = useState(null);
    const [nameErrorCompNames, setNameErrorCompNames] = useState(null);
    const [nameErrorCompAd, setNameErrorCompAd] = useState(null);
    const [nameErrorCompEmail, setNameErrorCompEmail] = useState(null);
    const [nameErrorCompPhone, setNameErrorCompPhone] = useState(null);
    const [showLoading, setshowLoading] = useState(true);
    const [showLoadingForm, setshowLoadingForm] = useState(true);

    const [web3provider, setWeb3] = useState();
    //const [thetitle, keeptitle] = useState();


    const state = useDrizzleState(state => state);

    const stateApp = {
        storedTitle: '',
        storedDescription: '',
        storedCategory: '',
        storedName: '',
        storedBio: '',
        storedLink: '',
        storedImage: '',
        storedCompname: '',
        storedCompaddress: '',
        storedCompcontactname: '',
        storedCompphone:'',
        storedCompemail: '',

    };

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
    //         console.log(drizzle.web3);
    //         getUser();
    //         getBalance();
    //     }
    // }

    async function getFee() {
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
        const thefees = drizzle.web3.utils.fromWei(thefee,'ether');
        setFee(thefees);
        setshowLoading(!showLoading);
        setshowLoadingForm(showLoadingForm);
    }

    async function getBalance(user) {
        const useraccount = await getUser();
        console.log(useraccount[0]);
        var stringaccount = useraccount[0].toString();
        setAccountinfo(stringaccount);
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
    } 
    useEffect(() => {    
        //checkProvider()
        checkMetamask()
        getFee();
        //getUser();
        //getBalance();
    }, []);

  
 
    const handleChange = (e, x) => {
       stateApp[e.target.id] = e.target.value;
        setNameError('');
        setNameErrorDesc('');
        setNameErrorName('');
        setNameErrorBio('');
        setNameErrorCompName('');
        setNameErrorCompNames('');
        setNameErrorCompAd('');
        setNameErrorCompEmail('');
        setNameErrorCompPhone('');

    }
    
    const handleImage = (e,x) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = (e) => {
            const buffer = Buffer(reader.result);
            setBuffer(buffer);
            console.log('buffer',buffer);
        

        //set on ipfs
        ipfs.files.add(buffer, (error,result)=> {
            if(error) {
                console.error(error)
                return
            }
            const ipfsHash = result[0].hash
            setipfsHash(ipfsHash)
            console.log(ipfsHash)
        })
      }
    }


   
    const handleSubmit = (e) => {
        e.preventDefault();
       
    }


    const gotostep = (e) => {
        setShowStep2(!showStep2);
        setShowStep1(!showStep1);
    
        //setshowLoadingForm(!showLoadingForm);
        //alert(stateApp['storedTitle']);
        // const thetitle = stateApp['storedTitle'];
        // keeptitle(thetitle);
    }

    const saveStoredData = async () => {

       
        

        //getting the fee from the contract
        const thefee = await drizzle.contracts.ImmutablePosts.methods.getFee().call();
        
        //getting the wallet address to share the fee
        const btSubmitElement = document.getElementById('submit-bt');
        const storedWalletPlugin = btSubmitElement.getAttribute('data-sharewallet');

        //Get again the Value of the first step
        const storedTitle = document.getElementById("storedTitle").value;
        stateApp['storedTitle'] = storedTitle;
        const storedDescription = document.getElementById("storedDescription").value;
        stateApp['storedDescription'] = storedDescription;
        const storedCategory = document.getElementById("storedCategory").value;
        stateApp['storedCategory'] = storedCategory;
        const storedImage = document.getElementById("storedImage").value;
        stateApp['storedImage'] = storedImage;
        //alert(stateApp['storedTitle']);

        // Reload the value if press next and prev
        const storedName = document.getElementById("storedName").value;
        stateApp['storedName'] = storedName;
        const storedBio = document.getElementById("storedBio").value;
        stateApp['storedBio'] = storedBio;
        const storedCompname = document.getElementById("storedCompname").value;
        stateApp['storedCompname'] = storedCompname;
        const storedCompaddress = document.getElementById("storedCompaddress").value;
        stateApp['storedCompaddress'] = storedCompaddress;
        const storedCompcontactname = document.getElementById("storedCompcontactname").value;
        stateApp['storedCompcontactname'] = storedCompcontactname;
        const storedCompphone = document.getElementById("storedCompphone").value;
        stateApp['storedCompphone'] = storedCompphone;
        const storedCompemail = document.getElementById("storedCompemail").value;
        stateApp['storedCompemail'] = storedCompemail;
        const storedCompcountry = document.getElementById("storedCompcountry").value;
        stateApp['storedCompcountry'] = storedCompcountry;
       
        //getting nbpost to generate id
        const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
        var j = nbposts;
    
        //TESTING VALUE
        if (stateApp['storedTitle'] == "" || stateApp['storedDescription'] == "" || stateApp['storedName'] == "" || stateApp['storedBio'] == "" || stateApp['storedCompname'] == "" || stateApp['storedCompaddress'] == "" || stateApp['storedCompcontactname'] == "" || stateApp['storedCompphone'] == "" || stateApp['storedCompemail'] == "") {
           if (stateApp['storedTitle'] == "") {
                setNameError('Please complete this field');
                setShowStep2(!showStep2);
                setShowStep1(!showStep1);
                return false;               
            } else if(stateApp['storedDescription'] == "") {
                setNameErrorDesc('Please complete this field');
                setShowStep2(!showStep2);
                setShowStep1(!showStep1)
                return false;
            } else if (stateApp['storedName'] == "") {
                setNameErrorName('Please complete this field');
                return false;
            } else if (stateApp['storedBio'] == "") {  
                setNameErrorBio('Please complete this field');  
                return false;
            } else if (stateApp['storedCompname'] == "") {
                setNameErrorCompName('Please complete this field');
                return false;  
            } else if (stateApp['storedCompaddress'] == "") {
                setNameErrorCompAd('Please complete this field');
                return false; 
            } else if (stateApp['storedCompcontactname'] == "") {
                setNameErrorCompNames('Please complete this field');
                return false;    
            } else if (stateApp['storedCompphone'] == "") {
                setNameErrorCompPhone('Please complete this field');
                return false; 
            } else if (stateApp['storedCompemail'] == "") {
                setNameErrorCompEmail('Please complete this field');
                return false;                    
            }   
        } else {

            setshowLoading(showLoading);
            var x = document.getElementById("loaderpost");
            x.style.display = "block";
            setshowLoadingForm(!showLoadingForm);
            console.log('mining post now');
            // EMAILING INVOICE
            //Send Email
            // Get Date
            var tempDate = new Date();
            var invoicenumberdate = tempDate.getFullYear() + '' + (tempDate.getMonth() + 1) + '' + tempDate.getDate() + '' + tempDate.getHours() + '' + tempDate.getMinutes() + '' + tempDate.getSeconds();
            var date = tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate() ;
            //Get GST option
            var pricenogst = 0.0872 * 0.909090909090909;
            var gst = 0.0872 - pricenogst;
            const currDate = date;

            //Get the link posted
            var strcat = stateApp['storedCategory'];
            strcat = strcat.replace(/\s+/g, '-').toLowerCase();
            var strtitle = stateApp['storedTitle'];
            strtitle = strtitle.replace(/\s+/g, '-').toLowerCase();
            var url = encodeURI("https://immutablepost.com/post/" + strcat + "/" + strtitle + "/" + j);
    
            var templateParams = {
                company_name: stateApp['storedCompname'],
                company_contact_name: stateApp['storedCompcontactname'],
                company_country: stateApp['storedCompcountry'],
                company_address: stateApp['storedCompaddress'],
                company_phone: stateApp['storedCompphone'],
                company_email: stateApp['storedCompemail'],
                fee: '0.0872 ETH',
                date: currDate,
                feenogst: pricenogst.toFixed(4),
                gstcal: gst.toFixed(4),
                invoicenb: invoicenumberdate,
                posturl: url
            };

            
            



              //POSTING HERE
              //getting author information and adding author to the post
           
              const transactionauthor = await drizzle.contracts.ImmutablePosts.methods
                    .createAuthor(stateApp['storedName'],stateApp['storedBio'],stateApp['storedLink'])
                  .send({ from: accountinfo, gas:3000000});

              //posting the article to the blockchain and do a check if image is there or not 
              if (ipfsHash) {
                   const transaction = await drizzle.contracts.ImmutablePosts.methods
                    .createPostandPay(stateApp['storedTitle'],stateApp['storedDescription'],stateApp['storedCategory'],storedWalletPlugin,ipfsHash)
                       .send({ from:accountinfo, value: drizzle.web3.utils.toWei(thefee, "wei"), gas:3000000});
               
                    if(transaction.status && transactionauthor.status) {
                        // Send EMAIL
                        if (stateApp['storedCompcountry'] == 'AUS') {
                            emailjs.send('gmail', 'template_0GD8avbv_au', templateParams, 'user_YH0LxXfG2pj9uhQ6IIJ8Z')
                                .then((result) => {
                                    console.log(result.text);
                                }, (error) => {
                                    console.log(error.text);
                                });
                        } else {
                            emailjs.send('gmail', 'template_0GD8avbv', templateParams, 'user_YH0LxXfG2pj9uhQ6IIJ8Z')
                                .then((result) => {
                                    console.log(result.text);
                                }, (error) => {
                                    console.log(error.text);
                                });
                        }

                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Your Post Has Been Made Immutable!',
                            type: 'success',
                            confirmButtonColor: '#e911bd',
                        }).then(function() {
                            window.location = "/";
                        });
                        setshowLoading(!showLoading);
                        var x = document.getElementById("loaderpost");
                        x.style.display = "none";
                        setshowLoadingForm(showLoadingForm);
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Opps!',
                            text: 'Error updating Post Data!',
                            type: 'error',
                            confirmButtonColor: '#e911bd',
                        });
                        setshowLoading(!showLoading);
                        var x = document.getElementById("loaderpost");
                        x.style.display = "none";
                        setshowLoadingForm(showLoadingForm);
                    }
              } else {
                  const transaction = await drizzle.contracts.ImmutablePosts.methods
                      .createPostandPay(stateApp['storedTitle'], stateApp['storedDescription'], stateApp['storedCategory'], storedWalletPlugin, '')
                      .send({ from:accountinfo, value: drizzle.web3.utils.toWei(thefee, "wei"), gas: 3000000 });

                  if (transaction.status && transactionauthor.status) {
                      // SEND EMAIL
                      if (stateApp['storedCompcountry'] == 'AUS') {
                          emailjs.send('gmail', 'template_0GD8avbv_au', templateParams, 'user_YH0LxXfG2pj9uhQ6IIJ8Z')
                              .then((result) => {
                                  console.log(result.text);
                              }, (error) => {
                                  console.log(error.text);
                              });
                      } else {
                          emailjs.send('gmail', 'template_0GD8avbv', templateParams, 'user_YH0LxXfG2pj9uhQ6IIJ8Z')
                              .then((result) => {
                                  console.log(result.text);
                              }, (error) => {
                                  console.log(error.text);
                              });
                      }


                      Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: 'Your Post Has Been Made Immutable!',
                          type: 'success',
                          confirmButtonColor: '#e911bd',
                      }).then(function () {
                          window.location = "/";
                      });
                      setshowLoading(!showLoading);
                      var x = document.getElementById("loaderpost");
                      x.style.display = "none";
                      setshowLoadingForm(showLoadingForm);
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Opps!',
                          text: 'Error updating Post Data!',
                          type: 'error',
                          confirmButtonColor: '#e911bd',
                      });
                      setshowLoading(!showLoading);
                      var x = document.getElementById("loaderpost");
                      x.style.display = "none";
                      setshowLoadingForm(showLoadingForm);
                  }    
              }


            
            }     

    }

    return balance ? (
        <div>
            <div className="front-landing-intro page">
                <h5 className="section-header info-color white-text text-center py-4">
                    <strong>Post your Immutable Article</strong><br />
                    <small>Cost per post: {thefee} ETH</small>
                </h5>
            </div>
           
            <div className="container formsubmitpost">
                
                <div id="loaderpost" className={showLoading ? "" : "hidden"}>
                    <main className="drizzle-loader-container">
                        <img src={immutablePostLoading} alt="Drizzle Logo" style={{ height: '100px' }} />
                        <div className="drizzle-loader-text">Mining your post...</div>
                    </main>
                </div>

                <form onSubmit={handleSubmit} className={showLoadingForm ? "" : "hidden"}>
                
                    <div id="formsection-step1" className={showStep1 ? "" : "hidden" }>  
                           {/* Post info  */}
                            <h4>Create your post</h4>
                            <div className="form-group">
                                <label htmlFor="storedTitle">Title <span>*</span></label>
                                <input type="text" className="form-control" id="storedTitle" onChange={handleChange} placeholder="Title"  />
                                <div className="errortext">{nameError}</div>
                            </div>
                            <div className="form-group">
                                 <label htmlFor="storedDescription">Description <span>*</span></label>
                                <textarea className="form-control" id="storedDescription" onChange={handleChange} placeholder="Description"  />
                                <div className="errortext">{nameErrorDesc}</div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="storedCategory">Category <span>*</span></label><br/>
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
                            <div className="form-group">
                            <label htmlFor="storedImage">Upload Feature Image</label>
                            <input type="file" className="form-control-file" id="storedImage" onChange={handleImage} />
                            </div>
                            <hr/>
                            <div className="nav-form">
                                <button className="btn btn-primary rightaligned" onClick={gotostep}>Next</button>
                            </div>
                            
                        </div>
                         
                        {/* {showStep2 && } */}
                        <div id="formsection-step2" className={showStep2 ? "" : "hidden" }> 
                          
                        {/* Author info  */}
                        <h4>A bit about yourself</h4>
                        <div className="form-group">
                            <label htmlFor="storedName">Your name <span>*</span></label>
                            <input type="text" className="form-control" id="storedName" onChange={handleChange} placeholder="Name"  />
                            <div className="errortext">{nameErrorName}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="storedBio">Your bio <span>*</span></label>
                            <textarea className="form-control" id="storedBio" onChange={handleChange} placeholder="Bio"/>
                            <div className="errortext">{nameErrorBio}</div>   
                     </div>
                        <div className="form-group">
                            <label htmlFor="storedLink">Your website(link)</label>
                            <input type="text" className="form-control" id="storedLink" onChange={handleChange} placeholder="Link" />
                        </div>
                          <hr/>
                            {/* Invoice info  */}
                            {/* <h4>Information for billing/invoice</h4> */}
              
                          <div className="form-group">
                                <label htmlFor="storedCompname">Company name <span>*</span></label>
                                <input type="text" className="form-control" id="storedCompname" onChange={handleChange} placeholder="Company Name"  />
                                <div className="errortext">{nameErrorCompName}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedCompcountry">Country <span>*</span></label>
                                    <div className="form-control-select">
                                         <Countries key="country" name="country" id="storedCompcountry" empty=" -- Select country --" onChange={handleChange} />
                                    </div>
                                <div className="errortext"></div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="storedCompaddress">Company address <span>*</span></label>
                                <input type="text" className="form-control" id="storedCompaddress" onChange={handleChange} placeholder="Company Address"  />
                                <div className="errortext">{nameErrorCompAd}</div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="storedCompcontactname">Company contact name <span>*</span></label>
                                <input type="text" className="form-control" id="storedCompcontactname" onChange={handleChange} placeholder="Company Contact Name"  />
                                 <div className="errortext">{nameErrorCompNames}</div>    
                            </div>
                            <div className="form-group">
                                 <label htmlFor="storedCompphone">Company phone <span>*</span></label>
                                <input type="tel" className="form-control" id="storedCompphone" onChange={handleChange} placeholder="Company Phone" />
                                 <div className="errortext">{nameErrorCompPhone}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedCompemail">Company email <span>*</span></label>
                                <input type="email" className="form-control" id="storedCompemail" onChange={handleChange} placeholder="Company Email" />
                                 <div className="errortext">{nameErrorCompEmail}</div>
                            </div>
                            <hr/>
                            <div className="nav-form">
                               <button className="btn btn-primary" onClick={gotostep}>Prev</button>
                            <button type="submit" className="btn btn-primary rightaligned" onClick={saveStoredData} id="submit-bt" data-sharewallet="0xCba957F4f4C0055314c00616955290c127AE37E5">Submit Post</button>
                            </div>
                           
                        </div>
                        
                </form>
                
                


            </div>
            
        </div>
    ) : (
            <div>
                <div className="front-landing-intro page">
                    <h5 className="section-header info-color white-text text-center py-4">
                        <strong>Post your Immutable Article</strong><br />
                        <small>Cost per post: {thefee} ETH</small>
                    </h5>
                </div>
                <div className="container formsubmitpost">
                    
                    <div className="bn-onboard-custom bn-onboard-icon-display svelte-18zts4b">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAoCAMAAACl6XjsAAABfVBMVEVHcEx/Rh2ARx2ESiLwiCLMu67cfCagZDOddlJ+Rx7pgiPlfyPshSN/Rxx+Rh2CSB6ASB2JTR7gkkl1SCbQciPUwLLMu6+BSB5/Rx2DSR5+RxzefR3ogCPlfiPGuLHhfiP2jCTvhyN/Rx3nfyPfo2/lfCTIuK7kfyP2jCPkfiPuhSTFtKjogSThfCR/Rx5+Rx3lfiPeeiTDs6koIR2DSh/ifCajWx6qYCDckVOBSR7jfiTyiCOYYTXLcCKpXiHEs6fDs6fCsKYjHBwhHx8iHR0iICB1a2ZyaGIiHyCPTx7ogSTlfyTwhyOASB7ziSTngCTrgyT2jCTthCT1iyPuhCX4jSSESh5/Rx6ITR/+kSTYbyDheSLjfSPBaiPacSDdcyCvYSK0ZCGTVSPGcSblhi/ngSPqgSTdu56mXSDaeSP6jiPmfSD5jSQcGhvimFdqUj/TbSJARUsyQE6tbDLOeyzZx7nayr7hsog7Nza/raDjjUF/VTjFtKhKNCB0amRMd0DeAAAASnRSTlMAe/oOkv4TAwgrpnA9n1n9vkYfHPv+xu2r9mgN6uI4Us5ji/n9Ln7G7pO61/K35ZXYiUji5s21zMnb0/r5aMipm2UkYjSGnPy0/l1QcU4AAALOSURBVHhehdJXXxpNFAbwBYIgoICCIKhgi91ETe/9fZ3ZXui92bvp5bPnzCwzK79c+Fxws3/mOXN2BSe+0Tnh1oBKTI7eqvypSUnaHP4XDIVeRn1cucKSJIUj4wMF6cVgYDr2KsrVXE4imUx6mEmHgoH786ZZ3b3H/usZAWW7R3fsAFFNhCrVwmaKdY4ylZdaqEgjI4yxUm7mpAjvjABjbt/QIIZJ1MF+Pu+eY3MMuwEwl2sfEidiBcdaeUl6yrcEkzks38IWMBnG2gUVTrIljSco4LUNGZxRaeZASW4X63Q5hznHyTGqpAfRwU5+WKGtaxC1SQsSKb+tfOyeTHWRDEyuNGhpf7me5EBjoYowFoEZ+gFx7pH+FYaTA0qBfSG6ErI2KcxZJMxVDhSkS1sV4twuNls0wVi4CYpEJ6yHwXEmpHJ5OxJTGNHhMLjH/BP0uQp2GpTwVhHY+orAExLt9ChxWhFWprYcFihaNKLDegZt7U4FuRpbPtbssONgRNECVjm6wYJFrR+5XK/VavVa9byO4L3qpWqMl/qznGlipV46b5xdturYIK//54sND7sAR3SnlfbZxeVFFYkw3MHV9dIQv8CAQ7qlXl+1kUoO78mMsQvwXiRbh8VjEenEqat9NlvUBmLJol2v6jDe89U0Vb7sDQa7k/UjxZSp04mjpw1ewBBRuV6qVbCCRFmzNNE0rOVZP2EZE9F0u10F10qQsr1hVTQ0WTSs7KwP2NA0wjxlUHWCmJRlo5jNELdlYidQaR92RINRp1P4vfPxnSAszis3XLkMD3Gn8+P0dGHh697e3vdvJyf/f4CrLqm8xFx/+IQ+jH/+QgK/wHbek9ZZwhSkq1MbwUW/f+buRJyIfn79+e/TuGBfomfi6UBmjH3NIL19Ffd6J2YEmhX92UqGbpEHzlzzeuNxL6ht9lmG0g5w5PbrtbWJN2/HyGB/AYd1QUewqrrRAAAAAElFTkSuQmCC" srcSet="data:image/png;base64,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" alt="MetaMask" className="svelte-18zts4b" />
                        <br></br><h3 className="toplogo">Setup MetaMask</h3>
                    </div>
                    {/* <p>please connect your wallet using the button below</p> */}
                    <p>To publish a post, You'll need to install MetaMask to continue. Once you have it installed, go ahead and refresh the page.</p>
                    <p>Make sure to select Ropsten Network to use our dApp for the moment. Thanks!</p>
                    <p><button className="btn btn-primary" onClick={gotometamask}>Install Metamask</button></p>
                    {/* <button className="btn btn-primary" onClick={gotowallet}>Connect Wallet</button> */}
                </div>
            </div>   
    );
}