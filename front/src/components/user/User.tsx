import './user.scss';
import CreateEventModal from '../createEventModal/CreateEventModal';

function User () {
  return (
    <div className='user'>
      <img src="https://picsum.photos/100/100" alt="avatar" />
      <div className='divMedia'>
        <div>
          <h2>Usuario Prueba</h2>
          <p>Cerdanyola del Valles</p>
        </div>
        <CreateEventModal />
      </div>
    </div>
  );
}

export default User;
