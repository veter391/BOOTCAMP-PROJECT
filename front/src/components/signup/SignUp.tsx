import './signup.scss';

import { useState, useContext } from 'react';
import InputValidate from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';
import userRegister from '../../services/userRegister';
import { AppContext } from '../../context/AppProvider';

function SignUp () {
  // get variavles from context
  const { handleSubmit } : any = useContext(AppContext);

  // company checkbox
  const [isCompany, setIsCompany] = useState(false);

  // funciton to run where submit form
  function signUp (values: object) {
    console.log('sign up');

    // N: register function for users
    userRegister(values);
  }

  return (
    <form onSubmit={handleSubmit(signUp)} className="form">
      {!isCompany && <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name="name"
        placeholder="Nombre..."
        scheme={validationScheme.name} />}

      {!isCompany && <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name="last_name"
        placeholder="Apellido..."
        scheme={validationScheme.surname} />}

      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="email"
        name='email'
        placeholder="Email..."
        scheme={validationScheme.email} />

      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="password"
        name='password' placeholder="Contraseña..."
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
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name='companyAddress' placeholder="Company address..."
        scheme={validationScheme.companyAddress} />

      <InputValidate
      classNameLabel="form__label"
      className="input-reset form__input"
      type="text"
      name='cif' placeholder="Company CIF..."
      scheme={validationScheme.cif} />
      </>
  );
}

export default SignUp;
