import './signup.scss';

import { useState, useContext } from 'react';
import InputValidate from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';
import userRegister from '../../services/userRegister';
import { AppContext } from '../../context/AppProvider';

function SignUp () {
  // get variavles from context
  const { handleSubmit } = useContext(AppContext);

  // company checkbox
  const [isCompany, setIsCompany] = useState(false);

  // funciton to run where submit form
  function signUp (values: object) {
    console.log('sign up');

    // N: register function for users
    userRegister(values);
    console.log(values);
  }
  console.log(validationScheme);

  return (
    <form onSubmit={handleSubmit(signUp)} className="form">
      {/* <label className="form__label">
        <input className="input-reset form__input" type="text" name="name" placeholder="Name..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="surname" placeholder="Surname..." />
      </label> */}

      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name="name"
        placeholder="Name..."
        scheme={validationScheme.name} />

      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name="surname"
        placeholder="Surname..."
        scheme={validationScheme.surname} />

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
      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name='companyName' placeholder="Company name..."
        scheme={validationScheme.companyName} />

      <InputValidate
        classNameLabel="form__label form__label-last"
        className="input-reset form__input"
        type="text"
        name='companyAddress' placeholder="Company address..."
        scheme={validationScheme.companyAddress} />
    </>
  );
}

export default SignUp;
