import React, { useState, useEffect } from 'react'
import Countries from 'react-select-country';
//import Select from 'react-select'
//import countryList from 'react-select-country-list'
import { drizzleReactHooks } from "@drizzle/react-plugin"
import emailjs from 'emailjs-com';
import ipfs from "../../ipfs.js"
import Swal from 'sweetalert2'

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function SecondaryPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [buffer, setBuffer] = useState();
    const [ipfsHash, setipfsHash] = useState();
    const [thefee, setFee] = useState(0);
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
            



              //POSTING HERE
              //getting author information and adding author to the post
              const transactionauthor = await drizzle.contracts.ImmutablePosts.methods
                    .createAuthor(stateApp['storedName'],stateApp['storedBio'],stateApp['storedLink'])
                    .send({from: state.accounts[0], gas:3000000});

              //posting the article to the blockchain and do a check if image is there or not 
              if (ipfsHash) {
                   const transaction = await drizzle.contracts.ImmutablePosts.methods
                    .createPostandPay(stateApp['storedTitle'],stateApp['storedDescription'],stateApp['storedCategory'],storedWalletPlugin,ipfsHash)
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
              } else {
                  const transaction = await drizzle.contracts.ImmutablePosts.methods
                      .createPostandPay(stateApp['storedTitle'], stateApp['storedDescription'], stateApp['storedCategory'], storedWalletPlugin, '')
                      .send({ from: state.accounts[0], value: drizzle.web3.utils.toWei(thefee, "wei"), gas: 3000000 });

                  if (transaction.status && transactionauthor.status) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Success',
                          text: 'Your Post Has Been Made Immutable!',
                          type: 'success',
                          confirmButtonColor: '#e911bd',
                      }).then(function () {
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
                
                <form onSubmit={handleSubmit}>
                
                    <div id="formsection-step1" className={showStep1 ? "" : "hidden" }>  
                           {/* Post info  */}
                            <h4>Create your post</h4>
                            <div className="form-group">
                                <label htmlFor="storedTitle">Title <span>*</span></label>
                                <input type="text" className="form-control" id="storedTitle" onChange={handleChange} placeholder="Title" required />
                                <div className="errortext">{nameError}</div>
                            </div>
                            <div className="form-group">
                                 <label htmlFor="storedDescription">Description <span>*</span></label>
                                <textarea className="form-control" id="storedDescription" onChange={handleChange} placeholder="Description" required />
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
                                <label htmlFor="storedDescription">Upload Feature Image</label>
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
                            <input type="text" className="form-control" id="storedName" onChange={handleChange} placeholder="Name" required />
                            <div className="errortext">{nameErrorName}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="storedBio">Your bio <span>*</span></label>
                            <textarea className="form-control" id="storedBio" onChange={handleChange} placeholder="Bio"required/>
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
                                <input type="text" className="form-control" id="storedCompname" onChange={handleChange} placeholder="Company Name" required />
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
                                <input type="text" className="form-control" id="storedCompaddress" onChange={handleChange} placeholder="Company Address" required />
                                <div className="errortext">{nameErrorCompAd}</div>
                            </div>
                            <div className="form-group">
                            <label htmlFor="storedCompcontactname">Company contact name <span>*</span></label>
                                <input type="text" className="form-control" id="storedCompcontactname" onChange={handleChange} placeholder="Company Contact Name" required />
                                 <div className="errortext">{nameErrorCompNames}</div>    
                            </div>
                            <div className="form-group">
                                 <label htmlFor="storedCompphone">Company phone <span>*</span></label>
                                <input type="tel" className="form-control" id="storedCompphone" onChange={handleChange} placeholder="Company Phone" required />
                                 <div className="errortext">{nameErrorCompPhone}</div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="storedCompemail">Company email <span>*</span></label>
                                <input type="email" className="form-control" id="storedCompemail" onChange={handleChange} placeholder="Company Email" required />
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
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Loading...</strong>
            </h5>
        </div>
    );
}