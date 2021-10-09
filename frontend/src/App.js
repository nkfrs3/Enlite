import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch} from 'react-router-dom'
import CoffeeBanner from "./components/CoffeeBanner";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import {restoreUser} from './store/session'
import Shops from "./components/Shops";
import ShopDetails from "./components/Shops/ShopDetails";
import Footer from "./components/Navigation/Footer";




function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('restoring!')
   dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded}/>
      <Route exact path='/(|shops)' >
        <CoffeeBanner />
      </Route>
      <Shops />
      <Footer />
    </>
  );
}

export default App;
