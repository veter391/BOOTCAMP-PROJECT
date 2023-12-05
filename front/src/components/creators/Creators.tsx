import './creators.scss';

type creatorType = {
  name: string;
  text: string;
}

function Creators () {
  return (
    <ul className='creators list-reset'>
      <Creator className='card' name='Joan' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' />
      <Creator className='card' name='Nazar' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' />
      <Creator className='card' name='Jose' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' />
      <Creator className='card' name='Oscar' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' />
    </ul>
  );
}

function Creator( props ) {
  const { name, text } : creatorType = props;

  return (
  <li {...props} >
    <img src="https://picsum.photos/85/85" alt="avatar" />
    <div>
      <h2>{name}</h2>
      <p>{text}</p>
    </div>
  </li>
  );
}
export default Creators;
