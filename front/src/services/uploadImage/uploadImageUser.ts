import { _url } from '../configVariables.ts';

async function uploadImageUser(id: number, file: File, token: string) {
  const baseUrl = `${_url}/users/${id}`;

  try {
    const formData = new FormData();
    formData.append('avatar', file);

    const resp = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return await resp.json();
  } catch (err: unknown) {
    throw new Error('Error al subir la imagen');
  }
}

export default uploadImageUser;