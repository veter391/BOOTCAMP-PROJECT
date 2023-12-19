import { useEffect, useState } from 'react';
import EventCard from '../eventCard/EventCard';
import './eventFeed.scss';

export type eventDataType = {
  id: number,
  user: number,
  user_id: number,
  title: string,
  description: string,
  city: string,
  address: string,
  first_name: string,
  last_name: string,
  org_name: string,
  name: string,
  avatar: string,
  date: string,
  type: string,
  finished: boolean,
  is_finished: boolean
}

function EventFeed ({ events, type = '' } : {events : eventDataType[], type : string}) {
  const [eventsClon, setEventsClon] = useState<eventDataType[]>([]);

  useEffect(() => {
    setEventsClon(events);
  }, [events]);

  useEffect(() => {
    if (type) {
      setEventsClon(events.filter((item: eventDataType) => item.type === type));
    } else {
      setEventsClon(events);
    }
  }, [type]);

  function findByName (list: eventDataType[], substr: string): eventDataType[] {
    // delete symbols and repeated spaces from substring
    const validSubstring = substr.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    // validate and return filtered by name list
    return list?.filter(item =>
      (item.title.toLowerCase().includes(validSubstring) && (type ? item.type === type : true)) ||
      (item.name.toLowerCase().includes(validSubstring) && (type ? item.type === type : true)) ||
      (item.address.toLowerCase().includes(validSubstring) && (type ? item.type === type : true)) ||
      (item.city.toLowerCase().includes(validSubstring) && (type ? item.type === type : true)));
  }

  return (
    <div className='feed'>
      <div className="feed__search-box">
        <input
          onChange={e => setEventsClon(findByName(events, e.target.value))}
          className='feed__input input-reset form__input'
          type="text"
          name="events"
          placeholder='Buscar Evento' />
        <button className='btn-reset form__btn btn'>Buscar</button>
      </div>

      <ul className='list-reset feed__list'>
        {
          eventsClon.map((item: eventDataType) => {
            return (
              <EventCard eventID={item.id} userId={item.user} key={item.id} type={item.type} title={item.title} date={item.date} location={item.city + ' / ' + item.address} description={item.description} avatar={item.avatar} name={item.name} />
            );
          })
        }
      </ul>
    </div>
  );
}

export default EventFeed;
export { EventCard };
