import "./Navigation.css";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { Modal } from "../../context/Modal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  // console.log(showModal)


  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <button id='profile_open_button' onClick={() => setShowModal(true)}>Log In</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginFormModal />
          </Modal>
        )}
      </>
    );
  }

  return (
    <nav id="nav_container">
      <ul id="nav_list">
        <NavLink exact to="/" id="shipshape_nav_logo">
          SKYHOP
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
