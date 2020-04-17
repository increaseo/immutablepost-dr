import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin";
import immutablePostLoading from '../../assets/loading.gif';

const { useDrizzle, useDrizzleState } = drizzleReactHooks;



export default function MainPage() {

    const { drizzle } = useDrizzle();
    const [balance, setBalance] = useState();
    const [nbposts, setnbposts] = useState(0);
    const [posturl, setPosturl] = useState([]);
    const [showLoading, setshowLoading] = useState(true);
    
    const state = useDrizzleState(state => state);
    const drizzleStatus = useDrizzleState(state => state.drizzleStatus);
   
    
   

    async function getNbPost() {
        const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
        setnbposts(nbposts);
    }
  
    const stateApp = {
        list:[]
    };
       
    const gotopublish = (e) => {
        window.location.href = "/submit-your-post";
    }
   
   
    async function getAllPost() {

        try {
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
                var excerpt = postdata.description.substr(0, 250);
                //console.log(postauthor);
                var postauthorid = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyAccount(postauthor).call();
            // console.log(postauthorid);
                var author = await drizzle.contracts.ImmutablePosts.methods.getAuthorbyId(postauthorid[0]).call();
                
                arrayallpostlist.push({ 'id': j, 'purl': url, 'title': postdata.title, 'category': postdata.category, 'description': excerpt, 'authorname': author.name, 'image': 'https://ipfs.io/ipfs/' + postdata.ipfshash}) ; 
                stateApp.list.push(postdata);
                
            }
            console.log(arrayallpostlist);
            // console.log(stateApp.list);
            setPosturl(arrayallpostlist.reverse());
            setshowLoading(!showLoading);
        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }  

    }
    
    

    useEffect(() => {    
        getNbPost();
        getAllPost();
       
        
    }, []);

    return nbposts ? (
       <div className="front">
        <div className="front-landing-intro">
                <div className="container content-frontintro">
                <h2 className="section-header info-color white-text py-4">
                    <strong>Welcome to Immutable Posts </strong>
                </h2>
                    <p>Publish your content onto the blockchain where it is stored immutably</p>
                    <button className="btn btn-primary" onClick={gotopublish}>Publish your post</button>
            </div>
        </div>
        <div className="container list-posts">
               <h3>List of Immutable Posts ({nbposts})</h3>
                <div className="listofposts">
                    <ul>
                        {posturl.map(result => (
                            <li key={result.id}>
                                <div className="postcontent">
                                    <div className="contentposttext">
                                        <h2><a href={result.purl}>{result.title}</a></h2>
                                        <small>({result.category})</small>
                                        <p><div dangerouslySetInnerHTML={{ __html: result.description }}></div></p>
                                        <div className="linkarticle">
                                            <a href={result.purl} className="linkmore">Read more</a>
                                        </div>
                                    </div>
                                    {result.image !="https://ipfs.io/ipfs/" &&
                                    <div className="imagepost"><img src={result.image} /></div>
                                    }
                                </div>
                          </li>
                        ))}
                    </ul>
                    <div id="loaderpost" className={showLoading ? "" : "hidden"}>
                        <main className="drizzle-loader-container">
                            <img src={immutablePostLoading} alt="Drizzle Logo" style={{ height: '100px' }} />
                            <div className="drizzle-loader-text">Loading...</div>
                        </main>
                    </div>
                </div>

            </div>
        
        </div>  
    ) : (
        
            <div className="front">
                <div className="front-landing-intro">
                    <div className="container content-frontintro">
                        <h2 className="section-header info-color white-text py-4">
                            <strong>Welcome to Immutable Posts </strong>
                        </h2>
                        <p>Publish your content onto the blockchain where it is stored immutably</p>
                        <button className="btn btn-primary" onClick={gotopublish}>Publish your post</button>
                    </div>
                </div>
                <div className="container list-posts">

                    
                </div>
             </div>   
    );
}