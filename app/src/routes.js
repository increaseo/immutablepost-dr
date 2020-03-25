import React from "react"
import { Switch, Route, BrowserRouter } from 'react-router-dom';


import MainPage from './components/pages/mainPage.component';
import SecondaryPage from "./components/pages/secondaryPage.component";
import AboutPage from "./components/pages/aboutPage.component";
import ContactPage from "./components/pages/contactPage.component";
import ArticleDetails from "./components/pages/articleDetails.component";


const Routes = () => {

  return (
    <BrowserRouter>
       <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/submit-your-post' component={SecondaryPage} />
          <Route path='/about' component={AboutPage} />
          <Route path='/contact' component={ContactPage} />
          <Route path='/post/:category/:title/:id' component={ArticleDetails}/>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes;