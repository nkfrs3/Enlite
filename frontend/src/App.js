import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from 'react-router-dom'
import CoffeeBanner from "./components/CoffeeBanner";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import {restoreUser} from './store/session'
import Shops from "./components/Shops";
import Footer from "./components/Navigation/Footer";
import ProfilePage from "./components/ProfilePage/Index";
import LandingPage from "./components/LandingPage/LandingPage";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('restoring!')
   dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      {/* <div id='flex-wrapper'> */}
        {/* <div id="wrapper"> */}
          <Navigation isLoaded={isLoaded}/>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path='/(|shops)' >
            <CoffeeBanner />
          </Route>
          <Shops />
          <Route path='/profile/:id'>
            <ProfilePage />
          </Route>
        {/* </div> */}
      <Footer />
      {/* </div> */}
    </>
  );
}

export default App;
