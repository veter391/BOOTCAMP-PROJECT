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
      <div className='divMedia'>
        <div>
          <h2>Usuario Prueba</h2>
          <p>Cerdanyola del Valles</p>
        </div>
        {!newEvent && <button onClick={() => setNewEvent(true)} className='btn-reset form__btn btn btn__createEvent'>Crear evento</button>}
      </div>
      {newEvent && <UserEvent setNewEvent={setNewEvent}/>}
    </div>
  );
}

function UserEvent ({ setNewEvent } :any) {
  const { handleSubmit }: any = useContext(AppContext);

  const handleEventClose = () => {
    window.scrollTo(0, 0);
    setNewEvent(false);
  };

  const createEvent = (values : object) => {
    console.log(values);

    // ! create fetch!!!
    console.log('event');
  };

  return (
    <form onSubmit={handleSubmit(createEvent)} className='form'>
      <h2 className='subtitle'>Nuevo evento</h2>
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
        name='address'
        placeholder='Dirección...'
        scheme={validationScheme.eventAddress} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input eventInput'
        type='text'
        name='location'
        placeholder='Ciudad...'
        scheme={validationScheme.eventLocation} />

      <AreaValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input event__form-descr eventInput'
        type='text'
        name='textarea' placeholder='Descripción...'
        scheme={validationScheme.eventDescr} />
      <div className='btns'>
        <button className='btn-reset form__btn btn btn__closeEvent' onClick={handleEventClose} type='submit'>Cerrar</button>
        <button className='btn-reset form__btn btn btn__createEvent' type='submit'>Crear evento</button>
      </div>
    </form>
  );
}

export default User;
