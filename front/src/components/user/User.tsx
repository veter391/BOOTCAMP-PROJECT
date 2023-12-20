import { useContext, useState, useRef } from 'react';
import './user.scss';
import { AppContext } from '../../context/AppProvider';
import uploadImageUser from '../../services/uploads/uploadsImageUser';
import CreateEventModal from '../createEventModal/CreateEventModal';

function User () {
  const { user }: any = useContext(AppContext);
  const [avatar, setAvatar] = useState<string>('./img/user.png');
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

        const userId = user.user?.id;
        const userToken = user.user?.token;

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
      <div onClick={handleAvatarClick} style={user.user.type === 'org' ? { borderColor: 'rgb(255, 149, 0)' } : { borderColor: 'var(--primary)' }} className="avatar-image">
        <img
          src={user.user.avatar || avatar}
          alt="avatar"
        />
      </div>
      <div className='divMedia'>
        <div className='divMediaSubdiv'>
          <h2>{user.user.name || 'Username'}</h2>
          <p>{user.user.city || 'Location'}</p>
        </div>
        <CreateEventModal />
      </div>
    </div>
  );
}

export default User;
