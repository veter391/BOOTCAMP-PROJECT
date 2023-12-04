import React from 'react';
import './creators.scss';

function Creators () {
  return (
    <div className='creators'>
    <Creator name='Joan'/>
    <Creator name='Nazar'/>
    <Creator name='Jose'/>
    <Creator name='Oscar'/>
    </div>
  );
}

function Creator ({ name }) {
  return (
  <div className='card'>
    <img src="https://picsum.photos/85/85" alt="avatar" />
    <ul>
      <h2>{name}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?</p>
    </ul>
  </div>
  );
}
export default Creators;
