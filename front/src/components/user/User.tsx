import { useContext, useState, useRef, ChangeEvent } from 'react';
import './user.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate, AreaValidate } from '../inputValidate/InputValidate';
import { AppContext } from '../../context/AppProvider';
import uploadImageUser from '../../services/uploadImage/uploadImageUser.ts';
import { useActionData } from 'react-router-dom';

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
          console.log('Imagen subida exitosamente:', response);
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
        alt='avatar'
        onClick={handleAvatarClick}
        className='avatar-image'
      />
      <h2>Username</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam assumenda repudiandae, consequuntur velit laborum debitis saepe consequatur natus eligendi error.</p>
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
