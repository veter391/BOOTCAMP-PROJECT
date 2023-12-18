import EventFeed from '../../components/eventFeed/EventFeed';
import User from '../../components/user/User';
import './account.scss';

function Account () {
  return (
    <section className="account">
      <div className="container container__account">
        <h2 className='subtitle'>Perfil</h2>
        <div className='maincontainer'>
          <User />
          <EventFeed />
        </div>
      </div>
    </section>
  );
}

export default Account;
