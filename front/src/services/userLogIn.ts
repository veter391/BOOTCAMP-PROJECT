async function userLogIn (obj : object) {
  const baseUrl = 'http://localhost:8080/users/login';

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (err : unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export default userLogIn;
