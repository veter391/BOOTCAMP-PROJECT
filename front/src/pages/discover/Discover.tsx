import './discover.scss';
import EventFeed from '../../components/eventFeed/EventFeed';

function Discover () {
  return (
    <section className='discover'>
      <div className="container discover__container">
        <input type='text' placeholder='Search...'></input>
        <a className='discover__selector' href="">events</a>
        <a className='discover__selector' href="">users/orgs</a>
        <div className='maincontainer'>

          {/* todo all list is a component and also every item is a component!!!  */}
          <ul className='filterContainer list-reset'>
            <Filter title={'Filter 1'} />
            <Filter title={'Filter 2'} />
            <Filter title={'Filter 3'} />
            <Filter title={'Filter 4'} />
            <button>Apply changes</button>
          </ul>
          <ul>
            <EventFeed />
          </ul>
        </div>
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