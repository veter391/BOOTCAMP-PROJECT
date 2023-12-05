import React from 'react';
import './eventFeed.scss';

function EventFeed () {
  return (
    <>
      <div className='feed'>
        <h2>Events</h2>
        <input type="text" placeholder='Search event...' />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </>
  );
}

function EventCard () {
  return (
    <article>
      <h3>Post title</h3>
      <p>Post description ...</p>
    </article>
  );
}
export default EventFeed;
