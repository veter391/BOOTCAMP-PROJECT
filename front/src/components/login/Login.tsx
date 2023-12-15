import './login.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate } from '../inputValidate/InputValidate';
import userLogIn from '../../services/userLogIn';
import { AppContext } from '../../context/AppProvider';
import { useContext } from 'react';

function LogIn () {
  // get variavles from context
  const { handleSubmit, setToken} : any = useContext(AppContext);

  const logIn = (values : object) => {
    // N: login user
    userLogIn(values)
      .then(data => {
        const { token, message } = data;
        console.log(message);
        localStorage.setItem('token', token);
        // setToken(token);
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(logIn)} className='form'>
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
