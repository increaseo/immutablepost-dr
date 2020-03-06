import React from "react";

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Navbar from "./components/layouts/navbar.component";
import MainPage from './components/pages/mainPage.component';
import SecondaryPage from "./components/pages/secondaryPage.component";
import AboutPage from "./components/pages/aboutPage.component";
import ContactPage from "./components/pages/contactPage.component";
import Footer from "./components/layouts/footer.component";
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
        </Switch>
        <Footer/>
      </div>
      
    </BrowserRouter>
  )
}

export default DappComponent;