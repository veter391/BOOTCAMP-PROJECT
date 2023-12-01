import React from 'react';

function Contacs () {
  return (
    <>
      <input type="text" placeholder='Search...' />
      <ul>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </ul>
    </>
  );
}

function ContactItem () {
  return (
    <li>
      <h2>Title</h2>
      <p>Lorem ipsum.</p>
    </li>
  );
}

export default Contacs;
