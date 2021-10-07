import { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";

const Navigation = ({isLoaded}) => {
  const [showLogin, setShowLogin] = useState(false);

  const toggle= (e) => {
    if (showLogin){
    setShowLogin(false)
  }}

  const currentUser = useSelector(state => state.session.user)

  return (
    <div onClick={toggle} className="nav-bar">
      <h1 className= 'title'>App</h1>
      {!showLogin && <h2 className='welcome'>{currentUser?.username}</h2>}
      { isLoaded && !showLogin && !currentUser && <span className="nav-link" onMouseUp={e => setShowLogin(!showLogin)}>Login</span>}
    {showLogin && <LoginForm setShowLogin={setShowLogin}/> }
    </div>
  )
}


export default Navigation;
