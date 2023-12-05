import React from 'react';
import './discover.scss';
import EventFeed from '../../components/eventFeed/EventFeed';

function Discover () {
  return (
    <section className='discover discover__container'>
    <input type='text' placeholder='Buscar...'></input>
    <a className='discover__selector' href="">events</a>
    <a className='discover__selector' href="">users/orgs</a>
    <div className='maincontainer'>
      <ul className='filterContainer list__reset'>
        <Filter />
        <Filter />
        <Filter />
        <Filter />
        <button>Apply changes</button>
      </ul>
      <ul>
        <EventFeed />
      </ul>
    </div>
    </section>
  );
}

export default Discover;

function Filter () {
  return (
    <article className='filter'>
      <input type="checkbox"/>
      <h3>Filter</h3>
      <img src="https://picsum.photos/15/15" alt="filtericon" />
    </article>
  );
}
