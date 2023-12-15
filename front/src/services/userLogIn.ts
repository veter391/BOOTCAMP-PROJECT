async function userLogIn (obj : object) {
  const baseUrl = 'http://localhost:8080/users/login';

  try {
    console.log(obj);
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (error : any) {
    console.error(error.message);
    return error;
  }
}

export default userLogIn;
