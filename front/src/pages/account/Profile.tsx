import { useEffect, useState } from 'react';
import EventFeed from '../../components/eventFeed/EventFeed';
import User from '../../components/user/User';
import './account.scss';
import getEvents from '../../services/events/getAllevents';

function Profile () {
  const [events, setEvents] = useState<eventDataType[]>([]);

  useEffect(() => {
    // getFollowedEvents()
    //   .then(data => {
    //     setEvents(data);
    //   })
    //   .catch(err => console.log(err));
  }, []);
  return (
    <section className="account">
      <div className="container">
        <h2 className='subtitle'>Profile</h2>
        <div className='maincontainer'>
          <User />
          <EventFeed events={events} type={''} />
        </div>
      </div>
    </section>
  );
}

export default Profile;
