import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle, useDrizzleState } = drizzleReactHooks;

export default function ArticleDetails(props) {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [postdetail, setPostDetail] = useState([]);
    const state = useDrizzleState(state => state);
    

    // Get the ID of the Post
    const thecategory = props.match.params.category;
    const thetitle = props.match.params.title;
    const theid = props.match.params.id;
    
    //Function to query any parameter (For reference)
    const query = props.location.search;
    const params = new URLSearchParams(query);
    const foo = params.get('id');
   
    //Get the URL if we need maybe
    var theurl = document.location + '';
   

    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
        setBalance(baleth);
    }

    async function getPostDetails() {
        const theid = props.match.params.id;
        const arraypostdetail= [];
        var postdata = await drizzle.contracts.ImmutablePosts.methods.getPostbyId(theid).call();
        var postauthor = postdata.authorpost;
        var postauthorid = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyAccount(postauthor).call();
        var author = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyId(postauthorid[0]).call();
        arraypostdetail.push({'title':postdata.title, 'category':postdata.category, 'description':postdata.description,'authorname':author.name, 'image':'https://ipfs.io/ipfs/'+postdata.ipfshash}) ;
        console.log(arraypostdetail);
        setPostDetail(arraypostdetail); 
    }

    useEffect(() => {    
        getBalance();
        getPostDetails();
    }, []);

    return balance ? (
        <div className="section">
              <h5 className="section-header info-color white-text text-center py-4">
                {postdetail.map(result => (
                    <strong key={props.match.params.id}>{result.title}</strong>
                ))}
             </h5>
            <div className="container">
                <div className="catgory-title"><small>From: </small>
                {postdetail.map(result => (
                    <small key={props.match.params.id}>{result.category} by {result.authorname}</small>
                ))}
                </div>
                <div className="article-details">
                    {postdetail.map(result => (
                            <div key={props.match.params.id}><div className="imagepost"><img src={result.image}/></div><div dangerouslySetInnerHTML={{__html: result.description}}></div></div>
                        ))}
                </div>
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