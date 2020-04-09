import React from "react";

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Navbar from "./components/layouts/navbar.component";
import MainPage from './components/pages/mainPage.component';
import SecondaryPage from "./components/pages/secondaryPage.component";
import AboutPage from "./components/pages/aboutPage.component";
import ContactPage from "./components/pages/contactPage.component";
import TermsPage from "./components/pages/termsPage.component";
import PrivacyPage from "./components/pages/privacyPage.component";
import ArticleDetails from "./components/pages/articleDetails.component";
import Footer from "./components/layouts/footer.component";
import CookieConsent, { Cookies } from "react-cookie-consent";

const DappComponent = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/submit-your-post' component={SecondaryPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/privacy' component={PrivacyPage} />
          <Route path='/terms' component={TermsPage} />
          <Route path='/post/:category/:title/:id' component={ArticleDetails}/>
        </Switch>
        <Footer/>
        <CookieConsent location="bottom"
          buttonText="Got it!"
          cookieName="myAwesomeCookieName2"
          style={{ background: "#333333" }}
          buttonStyle={{ color: "#FFFFFF", background: "#6FA342", fontSize: "18px" }}
          expires={150}>
          This website uses cookies to ensure you get the best experience on our website.
        </CookieConsent>
      </div>
      
    </BrowserRouter>
  )
}

export default DappComponent;