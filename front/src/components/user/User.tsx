import './user.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate, AreaValidate } from '../inputValidate/InputValidate';
import { AppContext } from '../../context/AppProvider';
import { FormEvent, useContext, useState } from 'react';
import createEvent from '../../services/events/createEvent';

interface FormData {
  title: string;
  date: string;
  location: string;
  address: string;
  description: string;
  user_id: number;
}

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

function UserEvent() {
  const { handleSubmit, user }: any = useContext(AppContext);

  async function createNewEvent(values: FormData) {
    try {
      // Envía datos del formulario
      const response = await createEvent(values);
      console.log('Valores del formulario:', values);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  }

  function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values: FormData = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      location: formData.get('location') as string,
      address: formData.get('address') as string,
      description: formData.get('textarea') as string,
      user_id: user.id
    };
    createNewEvent(values);
  }

  return (
    <form onSubmit={(e) => onSubmitForm(e)}  className='form'>
      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='title'
        placeholder='Title...'
        scheme={validationScheme.eventTitle} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='date'
        name='date'
        placeholder='Date...'
        scheme={validationScheme.eventTitle}
        />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='location'
        placeholder='City...'
        scheme={validationScheme.eventLocation} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='address'
        placeholder='Address...'
        scheme={validationScheme.eventLocation} />

      <AreaValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input event__form-descr'
        type='text'
        name='textarea' 
        placeholder='Description...'
        scheme={validationScheme.eventDescr} />
      <button className='btn-reset form__btn btn' type='submit'>Crear evento</button>
    </form>
  );
}

export default User;
