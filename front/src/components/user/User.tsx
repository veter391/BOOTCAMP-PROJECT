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
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam assumenda repudiandae, consequuntur velit laborum debitis saepe consequatur natus eligendi error.</p>
      {newEvent && <UserEvent />}
      <button onClick={() => setNewEvent(!newEvent)} className='btn-reset form__btn btn'>{(!newEvent && 'AÑADIR EVENTO +') || 'CERRAR'}</button>
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
        className='input-reset form__input'
        type='text'
        name='title'
        placeholder='Titulo...'
        scheme={validationScheme.eventTitle} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='location'
        placeholder='Location...'
        scheme={validationScheme.eventLocation} />

      <AreaValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input event__form-descr'
        type='text'
        name='textarea' placeholder='Description...'
        scheme={validationScheme.eventDescr} />
      <button className='btn-reset form__btn btn' type='submit'>Crear evento</button>
    </form>
  );
}

export default User;
