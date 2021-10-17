import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // console.log("login submit even: ", credential, password, errors);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="auth_modal_container">
      <div className="auth_modal_form_container">
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label className="modal_inputs_buttons">
            <input
              className="form_input"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder=" Username or Email"
            />
          </label>
          <label className="modal_inputs_buttons">
            <input
              className="form_input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" Password"
            />
          </label>
          <button className="modal_inputs_buttons" type="submit">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
