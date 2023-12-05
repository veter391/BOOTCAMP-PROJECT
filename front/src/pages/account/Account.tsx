import Contacs from '../../components/contacts/Contacs';
import EventFeed from '../../components/eventFeed/EventFeed';
import User from '../../components/user/User';
import './account.scss';

function Account () {
  return (
    <section className="account">
      <section className="container">
        <h2>Account</h2>
        <div className='maincontainer'>
          <User />
          <EventFeed />
          <Contacs/>
        </div>
      </section>
    </section>
  );
}

export default Account;
