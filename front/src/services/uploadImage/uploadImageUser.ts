import { _url } from '../configVariables.ts';

async function uploadImageUser(userId : number, file : File, token : string) {
  try {
    const avatar = new FormData();
    avatar.append('avatar', file);
    avatar.append('userId', String(userId));

    const response = await fetch(`${_url}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: avatar,
    });

    const data = await response.json();
    console.log('Imagen subida exitosamente:', data);
  } catch (err) {
    console.error('Error al subir la imagen:', err);
  }
}

export default uploadImageUser;