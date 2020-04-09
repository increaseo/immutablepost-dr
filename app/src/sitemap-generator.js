//Babel allows us to convert modern js code into backwards compatible versions
//This includes converting jsx into browser-readable code
const fs = require('fs');
const Web3 = require('web3') ;

//const Tx = require('ethereumjs-tx');
const es2015 = require('babel-preset-es2015');
const presetReact = require('babel-preset-react');
require("babel-register")({
  presets: [es2015, presetReact]
});
//Import our routes
const router = require("./routes").default;
const Sitemap = require("react-router-sitemap").default;


//web3js = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/159beab8ddc94e4fadf540f13abca684"));
web3js = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
const contractjson = JSON.parse(fs.readFileSync('./contracts/ImmutablePosts.json', 'utf8'));
var contractABI = contractjson.abi;
var contractAddress = '0x21dC0D52D10D89619099631E60e22570b4283E62';
//creating contract object
const contract = new web3js.eth.Contract(contractABI, contractAddress);


async function getAllPost() {


  const nbposts = await contract.methods.getNbArticles().call();
  const arrayallpostlist = [];

  for (var j = 0; j <= nbposts - 1; j++) {
    var postdata = await contract.methods.getPostbyId(j).call();
    var strcat = postdata.category;
    strcat = strcat.replace(/\s+/g, '-').toLowerCase();
    var strtitle = postdata.title;
    strtitle = strtitle.replace(/\s+/g, '-').toLowerCase();
    arrayallpostlist.push({ 'category': strcat, 'title': strtitle ,'id': j });
  

  }
  //console.log(arrayallpostlist);
  const pathsConfig = {
    '/post/:category/:title/:id': arrayallpostlist
  };

  return (
    new Sitemap(router())
      .applyParams(pathsConfig)
      .build("https://www.immutablepost.com")
      //Save it wherever you want
      .save("../public/sitemap.xml")
  );
}

function generateSitemap() {
  getAllPost();
}

generateSitemap();