import EventFeed from '../../components/eventFeed/EventFeed';
import User from '../../components/user/User';
import './account.scss';

function Profile () {
  return (
    <section className="account">
      <div className="container">
        <h2 className='subtitle'>Profile</h2>
        <div className='maincontainer'>
          <User />
          <EventFeed />
        </div>
      </div>
    </section>
  );
}

export default Profile;
