import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    console.log("login submit even: ", credential, password, errors);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div id='auth_modal_container'>
      <div id='modal_top_banner'><span>Log in or sign up</span></div>
      <div id='auth_modal_form_container'>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className='modal_inputs_buttons'>
            <input
              className='modal_inputs_buttons'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder=' Username or Email'
            />
          </label>
          <label className='modal_inputs_buttons'>
            <input
              className='modal_inputs_buttons'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=' Password'
            />
          </label>
          <button className='modal_inputs_buttons' type="submit">Log In</button>
        </form>
      </div>
      <div id='modal_divider'>
        <div id='line'></div>
          <span>or</span>
        <div id='line'></div>
      </div>
      <div id='demo_container'>
        <p id='demo_text'>Just want to tour the site?{(<button className='modal_inputs_buttons'>Demo User</button>)}</p>
      </div>
    </div>
  );
}

export default LoginForm;
