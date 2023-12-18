import './discover.scss';
import EventFeed, { eventDataType } from '../../components/eventFeed/EventFeed';
import { useEffect, useState } from 'react';
import getEvents from '../../services/events/getAllevents';

function Discover () {
  const [events, setEvents] = useState<eventDataType[]>([]);

  useEffect(() => {
    getEvents()
      .then(data => {
        setEvents(data);
      })
      .catch(err => console.log(err));
  }, []);

  const [filterType, setFilterType] = useState('');
  function changeType (e : any) {
    setFilterType(e.target.dataset.type);
  }
  return (
    <section className='discover'>
      <div className="container discover__container">
        <form className='discover__selection'>
          <label className={`discover__radio-label ${!filterType && 'active'}`}>
            Todos
            <input className='discover__radio' onChange={changeType} type="radio" data-type='' name="type" value="" checked={!filterType}/>
          </label>
          <label className={`discover__radio-label ${filterType === 'org' && 'active'}`}>
            Organizacion
            <input className='discover__radio' onChange={changeType} type="radio" data-type='org' name="type" value="org" checked={filterType === 'org'} />
          </label>
          <label className={`discover__radio-label ${filterType === 'user' && 'active'}`}>
            Usuarios
            <input className='discover__radio' onChange={changeType} type="radio" data-type='user' name="type" value="user" checked={filterType === 'user'} />
          </label>
        </form>
          {/* todo all list is a component and also every item is a component!!!  */}
        <EventFeed events={events} type={filterType} />
      </div>
    </section>
  );
}

export default Discover;

function Filter ({ title } : { title : string }) {
  return (
    <article className='filter'>
      <label className='filter__label'>
        <input type="checkbox"/>
        <h3>{title}</h3>
      </label>

      <img src="https://picsum.photos/15/15" alt="filtericon" />
    </article>
  );
}
