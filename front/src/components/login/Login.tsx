import './login.scss';
import validationScheme from '../../helpers/validationScheme';
import InputValidate from '../inputValidate/InputValidate';
import userLogIn from '../../services/userLogIn';
import { AppContext } from '../../context/AppProvider';
import { useContext } from 'react';

function LogIn () {
  // get variavles from context
  const { handleSubmit } = useContext(AppContext);

  const logIn = (values : object) => {
    console.log('login');

    // N: login user
    userLogIn(values);
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(logIn)} className="form">
      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="email"
        name='email'
        placeholder="Email..."
        scheme={validationScheme.email} />

      <InputValidate
        classNameLabel="form__label form__label-last"
        className="input-reset form__input"
        type="password"
        name='password' placeholder="Password..."
        scheme={validationScheme.password} />

      <a className="form__forgot-password" href="#">Forgot password?</a>
      <button className="btn-reset form__btn btn" type="submit">Log in</button>
    </form>
  );
}

export default LogIn;
