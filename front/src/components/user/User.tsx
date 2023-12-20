import { useContext, useRef } from 'react';
import './user.scss';
import { AppContext } from '../../context/AppProvider';
import uploadImageUser from '../../services/uploads/uploadsImageUser';
import CreateEventModal from '../createEventModal/CreateEventModal';

function User () {
  const { user, updateAvatar }: any = useContext(AppContext);
  // const [avatar, setAvatar] = useState<string>('./img/user.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // const picsumAvatar = 'https://picsum.photos/200';

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const userId = user?.user.id;
        const userToken = user?.token;

        // console.log(userId);
        // console.log(userToken);

        if (userId !== undefined && userId !== null && userToken) {
          console.log('user enviado front');
          // console.log('user enviado front');

          const response = await uploadImageUser(userId, file, userToken);

          updateAvatar(response.data);
          // console.log(userId);
          // console.log(file);
          // console.log(userToken);
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
        onChange={(e) => handleAvatarChange(e)}
        accept='image/*'
        id='avatarInput'
        hidden
        name="avatar"
      />
      <div onClick={handleAvatarClick} style={user.user.type === 'org' ? { borderColor: 'rgb(255, 149, 0)' } : { borderColor: 'var(--primary)' }} className="avatar-image">
        <img
          src={user.user.avatar ? `http://localhost:5000/${user.user.avatar}` : './img/user.png'}
          alt="avatar"
        />
      </div>
      <div className='divMedia'>
        <div className='divMediaSubdiv'>
          <h2>{user.name || 'Username'}</h2>
          <p>{user.city || 'Location'}</p>
        </div>
        <CreateEventModal />
      </div>
    </div>
  );
}

export default User;
