async function userLogIn (obj : object) {
  const baseUrl = 'http://localhost:5000/users/login';

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (error) {
    console.error(error.message);
  }
}

export default userLogIn;