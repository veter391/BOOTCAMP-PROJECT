import { useContext, useState, useRef } from 'react';
import './user.scss';
import { AppContext } from '../../context/AppProvider';
import uploadImageUser from '../../services/uploads/uploadsImageUser';
import CreateEventModal from '../createEventModal/CreateEventModal';

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error al subir la imagen:', error.message);
        }
      }
    }
  };

  return (
    <div className='user'>
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleAvatarChange}
        accept='image/*'
        id='avatarInput'
        hidden
      />
      <img
        src={avatar}
        alt="avatar"
        onClick={handleAvatarClick}
        className='avatar-image'
      />
      <div className='divMedia'>
        <div>
          <h2>Usuario Prueba</h2>
          <p>Cerdanyola del Valles</p>
        </div>
        <CreateEventModal />
      </div>
    </div>
  );
}

export default User;
