//Babel allows us to convert modern js code into backwards compatible versions
//This includes converting jsx into browser-readable code
const es2015 = require('babel-preset-es2015');
const presetReact = require('babel-preset-react');
require("babel-register")({
  presets: [es2015, presetReact]
});
//Import our routes

const router = require("./routes").default;
const getposts = require("./getposts").default;
const Sitemap = require("react-router-sitemap").default;


// async function generateSitemap() {
//   try {
   
//     const posts = await ImmutablePosts.methods.getNbArticles().call();
//     let idMap = [];

//     for(var i = 0; i < posts.length; i++) {
//       idMap.push({ id: posts[i].postId });
//     }

//     const paramsConfig = {
//       "/post/:id": idMap
//     };

//     return (
//       new Sitemap(router)
//           .applyParams(paramsConfig)
//           .build("https://www.example.com")
//           .save("../public/sitemap.xml")
//     );
//   } catch(e) {
//     console.log(e);
//   } 
// }


function generateSitemap() {
  
  
    //const nbposts = await ImmutablePosts.methods.getNbArticles().call();
    //setnbposts(nbposts);
  
  const pathsConfig = {
    '/post/:category/:title/:id': [
      { category: ['post-title-1'],title: ['post-title-1'],id: ['post-title-1'] },
      { category: ['post-title-1'],title: ['post-title-1'],id: ['post-title-1'] },
      { category: ['post-title-1'],title: ['post-title-1'],id: ['post-title-1'] },
 
     ]
  };


  return (
  new Sitemap(router())
  .applyParams(pathsConfig)
  .build("https://www.immutablepost.com")
 //Save it wherever you want
  .save("../public/sitemap.xml")
  );
}

generateSitemap();