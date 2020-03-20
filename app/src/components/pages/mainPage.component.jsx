import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle, useDrizzleState } = drizzleReactHooks;


export default function MainPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [nbposts, setnbposts] = useState(0);
    const [posturl, setPosturl] = useState([]);
    const state = useDrizzleState(state => state);


    async function getBalance() {
        const balance = await drizzle.web3.eth.getBalance(state.accounts[0]);
        const baleth = drizzle.web3.utils.fromWei(balance,'ether');
        setBalance(baleth);
    }
 

    async function getNbPost() {
        const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
        setnbposts(nbposts);
    }

    const stateApp = {
        list:[]
    };
       

    async function getAllPost() {

    
        const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
        const arrayallpostlist= [];

        for (var j=0; j <= nbposts-1; j++) {
            var postdata = await drizzle.contracts.ImmutablePosts.methods.getPostbyId(j).call();
            var strcat = postdata.category;
            strcat = strcat.replace(/\s+/g, '-').toLowerCase();
            var strtitle = postdata.title;
            strtitle = strtitle.replace(/\s+/g, '-').toLowerCase();
            var url = encodeURI("post/"+strcat+"/"+strtitle+"/"+j);
            var postauthor = postdata.authorpost;
            //console.log(postauthor);
            var postauthorid = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyAccount(postauthor).call();
           // console.log(postauthorid);
            var author = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyId(postauthorid[0]).call();
            
            arrayallpostlist.push({'id':j,'purl':url, 'title':postdata.title, 'category':postdata.category,'authorname':author.name}) ; 
            stateApp.list.push(postdata);
            
        }
         console.log(arrayallpostlist);
        // console.log(stateApp.list);
       setPosturl(arrayallpostlist); 
    }
    
    

    useEffect(() => {    
        getBalance();
        getNbPost();
        getAllPost();
     
    }, []);

    return balance ? (
        <div className="section">
            <h5 className="section-header info-color white-text text-center py-4">
                <strong>Immutable Posts </strong>
            </h5>
            <div className="container">
                <div className="ethamount">
                    You have in your account {balance} ETH.<br/><br/>
                </div>
                <h3>List of Immutable Posts ({nbposts})</h3>
                <div className="listofposts">
                    <ul>
                        {posturl.map(result => (
                            <li key={result.id}><a href={result.purl}>{result.title}</a> <small>({result.category})</small></li>
                        ))}
                    </ul>
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