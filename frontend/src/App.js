import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "./components/LoginForm";
import Navigation from "./components/Navigation";
import {restoreUser} from './store/session'



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
    </>
  );
}

export default App;
