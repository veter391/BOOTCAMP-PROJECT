import './createEventModal.scss';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppProvider';
import { AreaValidate, InputValidate } from '../inputValidate/InputValidate';
import validationScheme from '../../helpers/validationScheme';
import createEvent from '../../services/events/createEvent';

function CreateEventModal () {
  const { handleSubmit, user } :any = useContext(AppContext);
  const [modal, setModal] = useState(false);

  const handleToggle = () => {
    setModal(!modal);
  };

  function onSubmitForm (obj: object) {
    createEvent({ ...obj, user_id: user.id })
      .then(data => console.log(data))
      .catch(err => console.error(err));
    setModal(!modal);
  }

  return (
    <>
      <button onClick={handleToggle} className=' divMediaBTN btn-reset form__btn btn btn__createEvent'>Crear evento</button>

      {modal && <div className='modal'>
        <div className='modal__overlay'></div>
        <div className='modal__content'>
          <form onSubmit={handleSubmit(onSubmitForm)} className='form'>
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
            className='input-reset form__input'
            type='date'
            name='date'
            placeholder='Date...'
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
            name='city'
            placeholder='Ciudad...'
            scheme={validationScheme.eventLocation} />
          <AreaValidate
            classNameLabel='form__label form__label-last'
            className='input-reset form__input event__form-descr eventInput'
            type='text'
            name='description' placeholder='Descripción...'
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
