import { useState } from 'react';
import EventCard from '../eventCard/EventCard';
import './eventFeed.scss';

function EventFeed () {
  const [events, setEvents] = useState([]);

  function findByName(list: object[], substr: string): object[] {
    // reset first pack of characters
    setEvents((characterPages: object) => ({ ...characterPages, current: 1 }));
    // delete symbols and repeated spaces from substring
    const validSubstring = substr.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g, ' ').trim();
    // validate and return filtered by name list
    return list?.filter((item: any) => item.name.toLowerCase().includes(validSubstring));
  }

  return (
    <div className='feed'>
      <div className="feed__search-box">
        <input className='feed__input input-reset form__input' type="text" name="events" placeholder='Buscar Evento' />
        <button className='btn-reset form__btn btn'>buscar</button>
      </div>

      <ul className='list-reset feed__list'>
        <EventCard title={'Limpiar plaja'} date={'12:00'} location={'Barcelona/igualada'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but"} foto={''} name={'Media Market'} />
        <EventCard title={'Gatos'} date={'12:00'} location={'Barcelona/igualada'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but"} foto={''} name={'Media Market'} />
        <EventCard title={'perros'} date={'12:00'} location={'Barcelona/igualada'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but"} foto={''} name={'Media Market'} />
        <EventCard title={'perros 2'} date={'12:00'} location={'Barcelona/igualada'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but"} foto={''} name={'Media Market'} />
        <EventCard title={'comida'} date={'12:00'} location={'Barcelona/igualada'} description={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ip has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but"} foto={''} name={'Media Market'} />
      </ul>
    </div>
  );
}

export default EventFeed;
export { EventCard };
