import "./Navigation.css";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav id="nav_container">
      <ul id="nav_list">
        <NavLink exact to="/" id="shipshape_nav_logo">
          theHanger
        </NavLink>
        <div id="nav_right_button_group">
          <Link
            className="nav_right_buttons"
            id="nav_host_button"
            to='/create-listing'
          >
            Host your aircraft
          </Link>
          <li className="nav_right_buttons">{isLoaded && sessionLinks}</li>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
