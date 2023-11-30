import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Error from '../../components/errors/Error';

function ErrorPage () {
  const [counter, setCounter] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const idTime = setTimeout(() => navigate('/'), 5000);

    const idInt = setInterval(() => setCounter((oldCounter) => oldCounter - 1), 1000);

    return () => {
      clearTimeout(idTime);
      clearInterval(idInt);
    };
  }, []);

  return (
    <>
      <Error />
      <p>Go home in {counter}s.</p>
      <small>Click <Link to='/'>here</Link> to go home</small>
    </>
  );
}

export default ErrorPage;
