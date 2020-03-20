import React from "react"
import { drizzleReactHooks } from "@drizzle/react-plugin"

  const { useDrizzle, useDrizzleState } = drizzleReactHooks;
  const { drizzle } = useDrizzle();


  export default async function getNbPost() {
    const nbposts = await drizzle.contracts.ImmutablePosts.methods.getNbArticles().call();
    const arrayallpostlist= [];

    for (var j=0; j <= nbposts-1; j++) {
        var postdata = await drizzle.contracts.ImmutablePosts.methods.getPostbyId(j).call();
        arrayallpostlist.push({'id':j, 'title':postdata.title, 'category':postdata.category}) ; 
    }
    
    return arrayallpostlist;
     
}