import { useEffect, useState } from 'react';
import EventCard from '../eventCard/EventCard';
import './eventFeed.scss';
import { _url } from '../../services/configVariables';

type eventDataType = {
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

function EventFeed () {
  const [events, setEvents] = useState<eventDataType[]>([]);
  const [eventsClon, setEventsClon] = useState<eventDataType[]>([]);

  useEffect(() => {
    async function getEvents () {
      await fetch(`${_url}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          return data.map((item: eventDataType) => ({
            id: item.id,
            user: item.user_id,
            title: item.title,
            description: item.description,
            city: item.city,
            address: item.address,
            name: item.org_name || `${item.first_name} ${item.last_name}`,
            avatar: item.avatar,
            date: item.date,
            type: item.type,
            finished: item.is_finished
          }));
        })
        .then(data => {
          setEvents(data);
          setEventsClon(data);
        })
        .catch(err => console.log(err));
    }

    getEvents();
  }, []);

  function findByName (list: eventDataType[], substr: string): object[] {
    // delete symbols and repeated spaces from substring
    const validSubstring = substr.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    // validate and return filtered by name list
    return list?.filter(item =>
      item.title.toLowerCase().includes(validSubstring) ||
      item.name.toLowerCase().includes(validSubstring) ||
      item.address.toLowerCase().includes(validSubstring) ||
      item.city.toLowerCase().includes(validSubstring));
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
        <button className='btn-reset form__btn btn'>buscar</button>
      </div>

      <ul className='list-reset feed__list'>
        {
          eventsClon.map((item: eventDataType) => {
            return (
              <EventCard key={item.id} type={item.type} user={item.user} title={item.title} date={item.date} location={item.city + ' / ' + item.address} description={item.description} avatar={item.avatar} name={item.name} />
            );
          })
        }
      </ul>
    </div>
  );
}

export default EventFeed;
export { EventCard };
