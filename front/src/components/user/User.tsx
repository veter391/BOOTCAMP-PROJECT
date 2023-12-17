import './user.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate, AreaValidate } from '../inputValidate/InputValidate';
import { AppContext } from '../../context/AppProvider';
import { useContext, useState } from 'react';

function User () {
  const [newEvent, setNewEvent] = useState(false);

  return (
    <div className='user'>
      <img src="https://picsum.photos/100/100" alt="avatar" />
      <h2>Username</h2>
      <p>Location</p>
      {!newEvent && <button onClick={() => setNewEvent(true)} className='btn-reset form__btn btn'>ADD EVENT +</button>}
      {newEvent && <UserEvent />}
    </div>
  );
}

function UserEvent () {
  const { handleSubmit }: any = useContext(AppContext);

  function createEvent () {
    // ! create fetch!!!
    console.log('event');
  }

  return (
    <form onSubmit={handleSubmit(createEvent)} className='form'>
      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input eventInput'
        type='text'
        name='title'
        placeholder='Titulo...'
        scheme={validationScheme.eventTitle} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input eventInput'
        type='text'
        name='location'
        placeholder='Location...'
        scheme={validationScheme.eventLocation} />

      <AreaValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input event__form-descr eventInput'
        type='text'
        name='textarea' placeholder='Description...'
        scheme={validationScheme.eventDescr} />
      <button className='btn-reset form__btn btn btn__createEvent' type='submit'>Crear evento</button>
    </form>
  );
}

export default User;
