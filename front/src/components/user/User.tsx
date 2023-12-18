import { FormEvent, useEffect,useContext, useState, useRef } from 'react';
import './user.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate, AreaValidate } from '../inputValidate/InputValidate';
import { AppContext } from '../../context/AppProvider';
import createEvent from '../../services/events/createEvent';
import uploadImageUser from '../../services/uploads/uploadsImageUser';

interface FormData {
  title: string;
  date: string;
  location: string;
  address: string;
  description: string;
  user_id: number;
}

function User () {
  const { user }: any = useContext(AppContext);
  const [newEvent, setNewEvent] = useState(false);
  const [avatar, setAvatar] = useState<string>('https://picsum.photos/100/100');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const newAvatar = URL.createObjectURL(file);
        setAvatar(newAvatar);
  
        console.log('Nueva imagen seleccionada:', newAvatar);
  
        const userId = user?.id;
        const userToken = user?.token;
  
        console.log(userId);
        console.log(userToken);
        
        if (userId !== undefined && userId !== null && userToken) {
          const response = await uploadImageUser(userId, file, userToken);
          console.log('Imagen subida exitosamente');
        } else {
          console.error('ID de usuario o token no válidos');
        }
      } catch (error: any) {
        console.error('Error al subir la imagen:', error.message);
      }
    }
  };

  return (
    <div className='user'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept='image/*' //aceptar solo imagenes
        id='avatarInput'
        hidden
      />
      <img 
        src={avatar} 
        alt="avatar" 
        onClick={handleAvatarClick}
        className='avatar-image'
      />
      <h2>Username</h2>
      {/* //description */}
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam assumenda repudiandae, consequuntur velit laborum debitis saepe consequatur natus eligendi error.</p>
      {newEvent && <UserEvent />}
      <button onClick={() => setNewEvent(!newEvent)} className='btn-reset form__btn btn'>{(!newEvent && 'AÑADIR EVENTO +') || 'CERRAR'}</button>
    </div>
  );
}

function UserEvent() {
  const { handleSubmit, user }: any = useContext(AppContext);

  // async function createNewEvent(values: FormData) {
  //   try {
  //     const obj = {
  //       ...values,
  //       user_id: user.id
  //     }
  //     // Envía datos del formulario
  //     const response = await createEvent(obj);
  //     console.log('Valores del formulario:', obj);
  //     console.log('Respuesta del servidor:', response);
  //   } catch (error) {
  //     console.error('Error al crear el evento:', error);
  //   }
  // }

  function onSubmitForm(obj: object) {
  
    createEvent({...obj, user_id: user.id})
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}  className='form'>
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
        name='city'
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
        name='description' 
        placeholder='Description...'
        scheme={validationScheme.eventDescr} />
      <button className='btn-reset form__btn btn' type='submit'>Crear evento</button>
    </form>
  );
}

export default User;
