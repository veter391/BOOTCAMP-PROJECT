import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Error from '../../components/errors/Error';
import './error-page.scss';

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
    <section className='error'>
      <Error />
      <p>Go home in {counter}s.</p>
      <small>Click <Link className='colored-error' style={{ textDecoration: 'underline' }} to='/'>here</Link> to go home</small>
    </section>
  );
}

export default ErrorPage;
