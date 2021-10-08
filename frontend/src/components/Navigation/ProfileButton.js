import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/session";
import './ProfileButton.css'

const ProfileButton = ({user}) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
  <>
    <span onClick ={openMenu} className="profile-icon">
    <i class="fas fa-user-circle"></i>
    </span>
    <div className="dropdown-container">
     {showMenu && (
        <div className="profile-dropdown">
          <span id="profile">Profile</span>
          <span onClick={handleLogout}>
            Log Out
            </span>
        </div>
    )}
    </div>
  </>
  )
}

export default ProfileButton;
