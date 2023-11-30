import { useState } from 'react';
import './signup.scss'

function SignUp() {

  const [isCompany, setIsCompany] = useState(false)

  // funciton to run where submit form
  function signUp(e: any) {
    e.preventDefault();
    console.log('sign up')
  }

  return (
    <form onSubmit={signUp} className="form">
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="name" placeholder="Name..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="surname" placeholder="Surname..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="email" name="mail" placeholder="E-mail..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="password" name="password" placeholder="Password..." />
      </label>

      {
        // N: check if is company and if is add more inputs
        isCompany && <CompanyForm />
      }

      <label className="form__label form__label-last form__label-checkbox">
        <input onChange={() => setIsCompany( !isCompany )} className="form__label-checkbox__field" type="checkbox" name="checkbox" />
        <span className="form__label-checkbox__content"></span>
        Are you company?
      </label>
      <button className="btn-reset form__btn btn" type="submit">Create Account</button>
    </form>
  );
}

function CompanyForm() {
  return(
    <>
      <h2 style={{padding:'20px 20px 0 20px'}}>Company data:</h2>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="companyName" placeholder="Name of company..." />
      </label>
      <label className="form__label">
        <input className="input-reset form__input" type="text" name="street" placeholder="Street..." />
      </label>
    </>
  )
}

export default SignUp;
