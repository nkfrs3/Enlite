import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CoffeeBanner from "./components/CoffeeBanner";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import {restoreUser} from './store/session'
import Shops from "./components/Shops";



function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('restoring!')
   dispatch(restoreUser()).then(() => setIsLoaded(true));;
  }, [dispatch]);


  return (
    <>
    <Navigation isLoaded={isLoaded}/>
    <CoffeeBanner />
    <Shops />
    </>
  );
}

export default App;
