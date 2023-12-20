import { useContext, useEffect, useState } from 'react';
import EventFeed from '../../components/eventFeed/EventFeed';
import User from '../../components/user/User';
import './account.scss';
import getEvents from '../../services/events/getAllevents';
import { AppContext } from '../../context/AppProvider';

type dataType = {
  address: string;
  avatar: null | string;
  city: string;
  date: string;
  description: string;
  id: number;
  name: string;
  title: string;
  type: string;
  user: number;
}

function Profile () {
  /* @ts-ignore */
  const { getFollows } = useContext(AppContext);
  const [events, setEvents] = useState<any[]>([]);

  function filterFollowers (data: dataType[]) {
    let newData: object[] = [];
    for (let i = 0; i < getFollows.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (getFollows[i] === data[j].user) {
          newData = [...newData, data[j]];
        }
      }
    }
    return newData;
  }

  useEffect(() => {
    getEvents()
      .then(data => filterFollowers(data))
      .then(data => setEvents(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const newArr = filterFollowers(events);
    setEvents(newArr);
  }, [getFollows]);

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
