import { useState } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupFormPage";

const Navigation = ({isLoaded}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false)


  const toggle= (e) => {
    if (showLogin){
    setShowLogin(false)
  }
  if (showSignUp){
    setShowSignUp(false);
  }
}

  const currentUser = useSelector(state => state.session.user)

  return (
    <div onClick={toggle} className="nav-bar">
      <h1 className= 'title'>App</h1>
      {!showLogin && <h2 className='welcome'>{currentUser?.username}</h2>}
      { isLoaded && !showLogin && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowLogin(!showLogin)}>Login</span>}
      {showLogin && <LoginForm setShowLogin={setShowLogin}/> }
      { isLoaded && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowSignUp(true)}>Sign Up</span> }
      {showSignUp && <SignUpForm setShowSignUp={setShowSignUp} />}
    </div>
  )
}


export default Navigation;
