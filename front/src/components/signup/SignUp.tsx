import './signup.scss';

import { useState, useContext } from 'react';
import { InputValidate } from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';
import userRegister from '../../services/userRegister';
import { AppContext } from '../../context/AppProvider';

function SignUp () {
  // get variavles from context
  const { handleSubmit, userSetter } : any = useContext(AppContext);
  const [signUpError, setSignUpError] = useState();

  // company checkbox
  const [isCompany, setIsCompany] = useState(false);

  // funciton to run where submit form
  function signUp (values: object) {
    // N: register function for users
    userRegister({ ...values, state: (isCompany && 'org') || 'user' })
      .then(data => {
        const { user } = data;
        if (!user) throw new Error('Usuario ya existe!');
        userSetter(data);
        console.log('sign up');
      })
      .catch(err => setSignUpError(err.message));
  }

  return (
    <form onSubmit={handleSubmit(signUp)} className="form" style={{ position: 'relative' }}>
      {signUpError && <p className='colored-error error' style={{ fontSize: '14px', position: 'absolute', left: '0', top: '0', width: '100%', textAlign: 'center' }}>* {signUpError} *</p>}
      {!isCompany && <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name="first_name"
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

        <InputValidate
          classNameLabel="form__label"
          className="input-reset form__input"
          type="text"
          name='city' placeholder="Ciudad..."
          scheme={validationScheme.name} />

      {
        // N: check if is company and if is add more inputs
        isCompany && <CompanyForm />
      }

      <label className="form__label form__label-last form__label-checkbox">
        <input onChange={() => setIsCompany(!isCompany)} className="form__label-checkbox__field" type="checkbox" name="checkbox" />
        <span className="form__label-checkbox__content"></span>
        Eres una empresa?
      </label>
      <button className="btn-reset form__btn btn" type="submit">Crear cuenta</button>
    </form>
  );
}

function CompanyForm () {
  return (
    <>
      <div className="form__company-subtitle">
        <h2 className='form__company-subtitle-text'>Datos de la empresa</h2>
      </div>
      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name='org_name' placeholder="Nombre..."
        scheme={validationScheme.companyName} />

      <InputValidate
        classNameLabel="form__label"
        className="input-reset form__input"
        type="text"
        name='address' placeholder="Dirección..."
        scheme={validationScheme.companyAddress} />

      <InputValidate
      classNameLabel="form__label"
      className="input-reset form__input"
      type="text"
      name='cif' placeholder="CIF..."
      scheme={validationScheme.cif} />
      </>
  );
}

export default SignUp;
