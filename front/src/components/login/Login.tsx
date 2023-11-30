import './login.scss';
import { FormEvent } from 'react';

function LogIn () {
  // funciton to run where submit form
  function login (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('login');
  }

  return (
    <form onSubmit={login} className="form">
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="login" placeholder="Login..." />
      </label>
      <label className="form__label form__label-last">
        <input className="input-reset form__input" type="password" name="password" placeholder="Password..." />
      </label>
      <button className="btn-reset form__btn btn" type="submit">Log in</button>
    </form>
  );
}

export default LogIn;
