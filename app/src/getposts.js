import React, { useState, useEffect } from 'react';
import { drizzleReactHooks } from "@drizzle/react-plugin"

const { useDrizzle, useDrizzleState } = drizzleReactHooks;


const Getposts = () => {

  const { drizzle } = useDrizzle();
  const [posturl, setPosturl] = useState([]);
  const state = useDrizzleState(state => state);

  async function getNbPost() {
    const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
    const arrayallpostlist= [];

    for (var j=0; j <= nbposts-1; j++) {
        var postdata = await drizzle.contracts.ImmutablePosts.methods.getPostbyId(j).call();
        var strcat = postdata.category;
        strcat = strcat.replace(/\s+/g, '-').toLowerCase();
        var strtitle = postdata.title;
        strtitle = strtitle.replace(/\s+/g, '-').toLowerCase();
        var url = encodeURI("post/"+strcat+"/"+strtitle+"/"+j);
       
        
        arrayallpostlist.push({'id':j,'purl':url, 'title':postdata.title, 'category':postdata.category}) ; 
        stateApp.list.push(postdata);
        
    }
     console.log(arrayallpostlist);
     setPosturl(arrayallpostlist); 
}
getNbPost();
  return (
    {posturl}
  )
}

export default Getposts;