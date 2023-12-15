async function createEvent (obj: object) {
  const baseUrl = 'http://localhost:8080/events/create/';

  try {
    console.log(obj);

    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    console.log(resp);
    return await resp.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      return error;
    }
  }
}

export default createEvent;
