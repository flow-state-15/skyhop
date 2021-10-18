import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { NavLink } from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const user_id = useSelector(state => state.session.user.id)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (

    <div id='profileButton_container'>
      <button id='logged_in_button' onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div id="profile-dropdown-parent">
          <div id="profile-dropdown">
            <ul >
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <NavLink to={`/profile/${user_id}`}>My Bookings</NavLink>
              </li>
              <li>
                <NavLink to={`/profile/${user_id}`}>My Listings</NavLink>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}

export default ProfileButton;
