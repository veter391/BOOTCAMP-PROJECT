import './eventCard.scss';

type EventCardType = {
  title: string;
  date: string;
  location: string;
  description: string;
  foto: string;
  name: string;
}

function EventCard ({ title, date, location, description, foto, name }: EventCardType) {
  return (
    <article className='event-card' style={{ display: 'flex' }}>
      <div className="event-card__body">
        <h3 className='event-card__title'>{title}</h3>
        <p className='event-card__descr'>{description}</p>
        <small className='event-card__location'>{location}</small>
        <small className='event-card__date'>{date}</small>

        <div className="event-card__btns">
          <button className='event-card__btn event-card__btn-star btn-reset'>

            <svg height="45px" width="45px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 47.94 47.94" xmlSpace="preserve">
              <path style={{ fill: 'currentColor' }} d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
                    c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
                    c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
                    c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
                    c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
                    C22.602,0.567,25.338,0.567,26.285,2.486z"/>
            </svg>
          </button>
          <button className='event-card__btn btn-reset'>
            <svg style={{ fill: 'currentColor' }} height="45px" width="45px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 60 60" xmlSpace="preserve">
              <g>
                <path d="M55.894,37.041C58.582,33.271,60,28.913,60,24.414C60,11.504,48.337,1,34,1c-8.245,0-15.968,3.592-20.824,9.42
                        C17.021,8.613,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.235,14.77
                        c4.946,1.886,9.854,2.601,10.096,2.635c0.047,0.007,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554
                        c0.192-0.385,0.116-0.85-0.188-1.153C57.754,46.754,56.404,42.619,55.894,37.041z"/>
            <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.713-3.813,11.666
                    c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.139-0.01
                    c0.35-0.049,8.433-1.213,14.317-4.586c3.33,1.334,6.875,2.01,10.544,2.01c14.336,0,26-10.504,26-23.414S40.337,9.586,26,9.586z
                    M19.5,25h14c0.552,0,1,0.447,1,1s-0.448,1-1,1h-14c-0.552,0-1-0.447-1-1S18.948,25,19.5,25z M39,41H14c-0.552,0-1-0.447-1-1
                    s0.448-1,1-1h25c0.552,0,1,0.447,1,1S39.552,41,39,41z M39,34H14c-0.552,0-1-0.447-1-1s0.448-1,1-1h25c0.552,0,1,0.447,1,1
                    S39.552,34,39,34z"/>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="event-card__info">
        <img className='event-card__foto' src={foto || './img/user.png'} alt="event image" />
        <h3 className='event-card__name' >{name}</h3>
      </div>
    </article>
  );
}

export default EventCard;
