import './contacts.scss';

function Contacs () {
  return (
    <div className='contacts'>
      <h2>Contacts</h2>
      <input type="text" placeholder='Search...' />
      <ul>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </ul>
    </div>
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
