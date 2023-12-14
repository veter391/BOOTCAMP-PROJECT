import { useState } from 'react';

function Error () {
  const [error, setError] = useState({
    status: 404,
    message: "Path doesn't exist"
  });

  return (
    <>
      <h2>Error <span className="colored-error">{error.status}</span></h2>
      <h3>{error.message}</h3>
    </>
  );
}

export default Error;
