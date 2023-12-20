// spinner image
import spinnerImage from '../../assets/spinner.svg';

export default function Spinner () {
  return (
    <img className='spinner' style={{ width: '150px', margin: 'auto' }}
      src={spinnerImage}
      alt="spinner" />
  );
}
