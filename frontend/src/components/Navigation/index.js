import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupFormPage";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";

const Navigation = ({isLoaded}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false)

  useEffect(() => {
    if (!showLogin && !showSignUp) return;

    const closeModal = () => {
      setShowLogin(false);
      setShowSignUp(false);
    };

    document.addEventListener('click', closeModal);

    return () => document.removeEventListener("click", closeModal);
  }, [showLogin, showSignUp]);

  const currentUser = useSelector(state => state.session.user)

  return (
    <div className="nav-bar">
      <NavLink to="/" className='app-title' activeClassName="home">App</NavLink>
      {/* <h1 className= 'title'></h1> */}
      {!showLogin && <h2 className='welcome'>{currentUser?.username}</h2>}
      { isLoaded && !showLogin && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowLogin(!showLogin)}>Login</span>}
      {showLogin && <LoginForm setShowLogin={setShowLogin}/> }
      { isLoaded && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowSignUp(true)}>Sign Up</span> }
      {showSignUp && <SignUpForm setShowSignUp={setShowSignUp} />}
      {currentUser && <ProfileButton user={currentUser}/>}
    </div>
  )
}


export default Navigation;
