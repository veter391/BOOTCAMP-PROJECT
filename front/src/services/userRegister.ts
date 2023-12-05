async function userRegister (obj: object) {
  const baseUrl = 'http://localhost:5000/users/register';

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (error : any) {
    console.error(error.message);
  }
}

export default userRegister;
