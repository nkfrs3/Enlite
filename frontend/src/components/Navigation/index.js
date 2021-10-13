import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignupFormPage";
import ProfileButton from "./ProfileButton";
import { NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import Search from "./Search";


const Navigation = ({isLoaded}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false)
  // const [demoCount, setDemoCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!showLogin && !showSignUp) return;

    const closeModal = () => {
      setShowLogin(false);
      setShowSignUp(false);
    };

    document.addEventListener('click', closeModal);

    return () => document.removeEventListener("click", closeModal);
  }, [showLogin, showSignUp]);

  const currentUser = useSelector(state => state.session.user);

  const handleDemo = async () => {
    let num = Math.floor(Math.random() * 999);
    const demoUser ={username: `Visitor${num}`, email: `visitor@enlite${num}.com`, password: 'password'}
    // setDemoCount(prev => prev + 1);
    const demo = await dispatch(signUp(demoUser))
  }

  return (
    <div className="nav-bar">
      <NavLink to="/" className='app-title' activeClassName="home">Enlite</NavLink>
    { ! showLogin && !showSignUp && <Search/>}
      { !showLogin && !showSignUp &&  <NavLink to="/shops" className='nav-link link-to-shops' activeClassName="at-shops">Shops</NavLink> }

      {!showLogin && <h2 className='welcome'>{currentUser?.username}</h2>}
      { isLoaded && !showLogin && !showSignUp && !currentUser &&
      <div>
      <span className='demo nav-link' onMouseUp={handleDemo} >Demo</span>
      <span className="nav-link" onMouseUp={e => setShowLogin(!showLogin)}>Login</span>
      <span className="nav-link" onMouseUp={e => setShowSignUp(true)}>Sign Up</span>
      </div>
      }

      {/* { isLoaded && !showLogin && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowLogin(!showLogin)}>Login</span>} */}
      {showLogin && <LoginForm setShowLogin={setShowLogin}/> }
      {/* { isLoaded && !showSignUp && !currentUser && <span className="nav-link" onMouseUp={e => setShowSignUp(true)}>Sign Up</span> } */}

      {showSignUp && <SignUpForm setShowSignUp={setShowSignUp} />}
      {currentUser && <ProfileButton user={currentUser}/>}
    </div>
  )
}


export default Navigation;
