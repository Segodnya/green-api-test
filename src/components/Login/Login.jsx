import React from 'react';
import './Login.css';
import useForm from '../../hooks/useForm';

function Login({ onLogin }) {
  const { values, handleChange } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.IdInstance, values.ApiTokenInstance);
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="whatsAPP logo" />
        <div className="login_text">
          <h6>Sign in to WhatsApp</h6>
        </div>
        <div className="login__form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              id="IdInstance"
              className="login-form__input"
              name="IdInstance"
              value={values?.IdInstance || ''}
              placeholder="IdInstance"
              onChange={handleChange}
              type="text"
              minLength="5"
              maxLength="12"
              required
            />
            <input
              id="ApiTokenInstance"
              className="login-form__input"
              name="ApiTokenInstance"
              value={values?.ApiTokenInstance || ''}
              placeholder="ApiTokenInstance"
              onChange={handleChange}
              type="text"
              required
            />
            <button className="login-form__button" type="submit">
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
