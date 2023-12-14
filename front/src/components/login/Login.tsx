import './login.scss';
import validationScheme from '../../helpers/validationScheme';
import InputValidate from '../inputValidate/InputValidate';
import userLogIn from '../../services/userLogIn';
import { AppContext } from '../../context/AppProvider';
import { useContext, useState } from 'react';

function LogIn () {
  // get variavles from context
  const { handleSubmit, setToken, userSetter} : any = useContext(AppContext);
  const [logInError, setLogInError] = useState();

  const logIn = (values : object) => {
    // N: login user
    userLogIn(values)
      .then(data => {
        const { token, message, user, error } = data;
        console.log(message);
        console.log(data);
        if (token) {
          localStorage.setItem('token', token);
          const userLS = {
            exp: Date.now() + (1000 * 60 * 60 * 24),
            ...user
          };
          userSetter(userLS);
        } else {
          setLogInError(error);
          console.log('Wrong mail or password');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(logIn)} className='form colored-error'>
      {logInError && <p className='colored-error error' style={{ fontSize: '12px' }}>Usuario o contraseña incorrectos</p>}
      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='email'
        name='email'
        placeholder='Email...'
        scheme={validationScheme.email} />

      <InputValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input'
        type='password'
        name='password' placeholder='Contraseña...'
        scheme={validationScheme.password} />

      <a className='form__forgot-password' href='#'>Has olvidado la contraseña?</a>
      <button className='btn-reset form__btn btn' type='submit'>Iniciar sesión</button>
    </form>
  );
}

export default LogIn;
