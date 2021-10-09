import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { demoLogout, logout } from "../../store/session";
import './ProfileButton.css'

const ProfileButton = ({user}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleVisit = () =>{
    history.push(`/profile/${user.id}`)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    console.log(user.email);
    if (user.email.includes('visitor@enlite')){
      dispatch(demoLogout(user.id));
    } else {
      dispatch(logout());
    } if (window.location.href.startsWith('http://localhost:3000/profile')){
      history.push('/');
    }
  };

  return (
  <>
    <span onClick ={openMenu} className="profile-icon">
    <i class="fas fa-user-circle"></i>
    </span>
    <div className="dropdown-container">
     {showMenu && (
        <div className="profile-dropdown">
          <span id="profile" onClick={handleVisit}>Profile</span>
          <span className='logout' onClick={handleLogout}>
            Log Out
            </span>
        </div>
    )}
    </div>
  </>
  )
}

export default ProfileButton;
