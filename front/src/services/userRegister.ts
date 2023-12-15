async function userRegister (obj: object) {
  const baseUrl = 'http://localhost:8080/users/register';

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (error : unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export default userRegister;
