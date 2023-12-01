import './login.scss';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';
import validationScheme from '../../helpers/validationScheme';
import InputValidate from '../inputValidate/InputValidate';

export type handlersType = {
  register: UseFormRegister<FieldValues>,
  errors: FieldErrors<FieldValues>,
}

function LogIn () {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const handlers: handlersType = { register, errors };

  const logIn = values => {
    console.log('login');
    const data = {
      email: values.email,
      password: values.password
    };

    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(logIn)} className="form">
      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="email"
        name='email'
        placeholder="Email..."
        handlers={handlers}
        scheme={validationScheme.email} />

      <InputValidate
        classNameLabel="form__label form__label-last"
        className="input-reset form__input"
        type="password"
        name='password' placeholder="Password..."
        handlers={handlers}
        scheme={validationScheme.password} />

      <a className="form__forgot-password" href="#">Forgot password?</a>
      <button className="btn-reset form__btn btn" type="submit">Log in</button>
    </form>
  );
}

export default LogIn;
