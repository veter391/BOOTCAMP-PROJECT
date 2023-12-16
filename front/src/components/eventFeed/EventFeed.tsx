import { useEffect, useState } from 'react';
import EventCard from '../eventCard/EventCard';
import './eventFeed.scss';
import { _url } from '../../services/configVariables';

function EventFeed () {
  const [events, setEvents] = useState([]);
  const [eventsClon, setEventsClon] = useState([]);
  const [location, setlocation] = useState([]);

  useEffect(() => {
    async function getEvents () {
      await fetch(`${_url}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => {
          setEvents(data);
          setEventsClon(data);
        })
        .catch(err => console.log(err));
    }

    getEvents();
  }, []);

  function findByName (location: string = '', list: object[], substr: string): object[] {
    // delete symbols and repeated spaces from substring
    const validSubstring = substr.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ').trim();
    // validate and return filtered by name list
    return list?.filter((item) => item.title.toLowerCase().includes(validSubstring) || item.name.toLowerCase().includes(validSubstring) && item.address.toLowerCase().includes(location));
  }

  return (
    <div className='feed'>
      <div className="feed__search-box">
        <input
          onChange={e => setEventsClon(findByName(location ,events, e.target.value))}
          className='feed__input input-reset form__input'
          type="text"
          name="events"
          placeholder='Buscar Evento' />
        <input
          onChange={e => setlocation(e.target.value)}
          className='feed__input input-reset form__input'
          type="text"
          name="eventsLocation"
          placeholder='Buscar localización' />
        <button className='btn-reset form__btn btn'>buscar</button>
      </div>

      <ul className='list-reset feed__list'>
        {
          eventsClon.map((item) => {
            return (
              <EventCard key={item.id} title={item.title} date={'12:00'} location={item.address} description={item.description} foto={''} name={item.name} />
            );
          })
        }
      </ul>
    </div>
  );
}

export default EventFeed;
export { EventCard };
