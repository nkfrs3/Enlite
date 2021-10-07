import { useState } from "react";
import LoginForm from "../LoginForm";

const Navigation = () => {
  const [showLogin, setShowLogin] = useState(false);
  const toggle= (e) => {
    if (showLogin){
    setShowLogin(false)
  }}

  return (
    <div onClick={toggle} className="nav-bar">
      {!showLogin && <span className="login "onClick={e => setShowLogin(!showLogin)}>Login</span>}
    {showLogin && <LoginForm setShowLogin={setShowLogin}/> }
    </div>
  )
}


export default Navigation;
