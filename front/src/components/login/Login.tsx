import './login.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate } from '../inputValidate/InputValidate';
import userLogIn from '../../services/userLogIn';
import { AppContext } from '../../context/AppProvider';
import { useContext, useState } from 'react';

function LogIn () {
  // get variavles from context
  const { handleSubmit, userSetter } : any = useContext(AppContext);
  const [logInError, setLogInError] = useState();

  const logIn = (values : object) => {
    // N: login user
    userLogIn(values)
      .then(data => {
        const { user, token } = data;
        if (!user) throw new Error('Useario no existe tienes que registrarte!');
        userSetter(user, token);
        console.log('login');
      })
      .catch(err => setLogInError(err.message));
  };

  return (
    <form onSubmit={handleSubmit(logIn)} className='form' style={{ position: 'relative' }}>
      {logInError && <p className='colored-error error' style={{ fontSize: '14px', position: 'absolute', left: '0', top: '0', width: '100%', textAlign: 'center' }}>* {logInError} *</p>}
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
