import { _url } from './configVariables';

async function followsAndReactions (obj: object) {
  const baseUrl = `${_url}/followsAndReactions`;

  try {
    const resp = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    });
    return await resp.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
}

export default followsAndReactions;
