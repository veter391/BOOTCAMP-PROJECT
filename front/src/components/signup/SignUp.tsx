import { useState, FormEvent } from 'react';
import './signup.scss';
import InputValidate from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';
import { useForm, UseFormRegister, FieldValues, FieldErrors } from 'react-hook-form';

function SignUp () {
  const [isCompany, setIsCompany] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const handlers: handlersType = { register, errors };

  // funciton to run where submit form
  function signUp (values) {
    console.log('sign up');
    const data = {
      email: values.email,
      password: values.password
    };

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(signUp)} className="form">
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="name" placeholder="Name..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="surname" placeholder="Surname..." />
      </label>

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

      {
        // N: check if is company and if is add more inputs
        isCompany && <CompanyForm />
      }

      <label className="form__label form__label-last form__label-checkbox">
        <input onChange={() => setIsCompany(!isCompany)} className="form__label-checkbox__field" type="checkbox" name="checkbox" />
        <span className="form__label-checkbox__content"></span>
        Are you company?
      </label>
      <button className="btn-reset form__btn btn" type="submit">Create Account</button>
    </form>
  );
}

function CompanyForm () {
  return (
    <>
      <div className="form__company-subtitle">
        <h2 className='form__company-subtitle-text'>Company data</h2>

      </div>

      <label className="form__label">
        <input className="input-reset form__input" type="text" name="companyName" placeholder="Name of company..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="street" placeholder="Street..." />
      </label>
    </>
  );
}

export default SignUp;
