import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginForm from '../LoginFormModal/LoginForm'
import SignupForm from "../LoginFormModal/SignupForm";


function LoginSplashPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [login_clicked, setLogin_clicked] = useState(true);

  const demoLogin = async () => {
    dispatch(
      sessionActions.login({
        credential: "Demo1@demo.demo",
        password: "Demo1@demo.demo",
      })
    );
    return history.push("/");
  };

  if (sessionUser) {
    return (<Redirect to="/" />)
  } else {
    return (
      <div>
        <div>
          <h2>Welcome to Skyhop!</h2>
          <span>Please Log in or Sign up to access all the features</span>
          <div className="auth_modal_container">
            <div id="modal_top_banner">
              <span>
                <Link
                  to=""
                  onClick={(e) => {
                    e.preventDefault()
                    setLogin_clicked(true);
                  }}
                >
                  Log in
                </Link>
                {" "}or{" "}
                <Link
                  to=""
                  onClick={(e) => {
                    e.preventDefault()
                    setLogin_clicked(false);
                  }}
                >
                  Sign up
                </Link>
              </span>
            </div>
            {login_clicked ? <LoginForm /> : <SignupForm />}
            <div id="modal_divider">
              <div id="line"></div>
              <span>or</span>
              <div id="line"></div>
            </div>
            <div id="demo_container">
              <p id="demo_text">
                <span>Just want to tour the site?</span>
                {
                  <button className="modal_inputs_buttons" onClick={demoLogin}>
                    Demo User
                  </button>
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSplashPage;
