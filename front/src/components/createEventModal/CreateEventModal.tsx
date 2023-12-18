import './createEventModal.scss';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { AreaValidate, InputValidate } from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';

function CreateEventModal () {
  const { handleSubmit } :any = useContext(AppContext);
  const [modal, setModal] = useState(false);

  const handleToggle = () => {
    setModal(!modal);
  };

  const createEvent = (values : object) => {
    console.log(values);
    setModal(!modal);
    // ! create fetch!!!
    console.log('event');
  };

  console.log(modal);

  return (
    <>
      <button onClick={handleToggle} className='btn-reset form__btn btn btn__createEvent'>Crear evento</button>

      {modal && <div className='modal'>
        <div className='modal__overlay'></div>
        <div className='modal__content'>
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
            <button className='btn-reset form__btn btn btn__closeEvent' onClick={handleToggle} type='submit'>Cerrar</button>
            <button className='btn-reset form__btn btn btn__createEvent' type='submit'>Crear evento</button>
          </div>
          </form>
        </div>
      </div>}
    </>
  );
}

export default CreateEventModal;
