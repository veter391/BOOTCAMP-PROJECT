import { useContext, useState, useRef, ChangeEvent, FormEvent  } from 'react';
import './user.scss';
import validationScheme from '../../helpers/validationScheme';
import { InputValidate, AreaValidate } from '../inputValidate/InputValidate';
import { AppContext } from '../../context/AppProvider';
import uploadImageUser from '../../services/uploadImage/uploadImageUser.ts';
import { useActionData } from 'react-router-dom';
import createEvent from '../../services/events/createEvent.ts';


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
  const { handleSubmit, user }: any = useContext(AppContext);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    date: '',
    location: '',
    address: '',
    description: '',
    user_id: user.id
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    const fieldValue = type === 'text' || type === 'date' ? value : e.target.value;

    setFormData((data) => ({
      ...data,
      [name]: fieldValue
    }));
  };

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //envía datos del formulario
      const response = await createEvent(formData); 
      console.log(formData);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al crear el evento:', error);
    }
  };

  return (
    <form onSubmit={handleSubmitForm} className='form'>
      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='title'
        placeholder='Title...'
        value={formData.title}
        onChange={handleChange}
        scheme={validationScheme.eventTitle} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='date'
        name='date'
        placeholder='Date...'
        value={formData.date}
        onChange={handleChange}
        scheme={validationScheme.eventTitle}
        />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='location'
        placeholder='City...'
        value={formData.location}
        onChange={handleChange}
        scheme={validationScheme.eventLocation} />

      <InputValidate
        classNameLabel='form__label'
        className='input-reset form__input'
        type='text'
        name='address'
        placeholder='Address...'
        value={formData.address}
        onChange={handleChange}
        scheme={validationScheme.eventLocation} />

      <AreaValidate
        classNameLabel='form__label form__label-last'
        className='input-reset form__input event__form-descr'
        type='text'
        name='textarea' 
        placeholder='Description...'
        value={formData.description}
        onChange={handleChange}
        scheme={validationScheme.eventDescr} />
      <button className='btn-reset form__btn btn' type='submit'>Crear evento</button>
    </form>
  );
}

export default User;
