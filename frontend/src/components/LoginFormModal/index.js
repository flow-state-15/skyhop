import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

function LoginFormModal() {
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

  return (
    <>
      <div id="auth_modal_container">
        <div id="modal_top_banner">
          <span>
            <Link
              to=""
              onClick={() => {
                setLogin_clicked(true);
              }}
            >
              Log in
            </Link>{" "}
            or
            <Link
              to=""
              onClick={() => {
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
    </>
  );
}

export default LoginFormModal;
