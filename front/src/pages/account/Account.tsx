import Contacs from '../../components/contacts/Contacs';
import './account.scss';

function Account () {
  return (
    <section className="account">
      <div className="container account__container">
        <h2>Account</h2>
        <div className='account__posts'>
          <article>
            <h3>post title</h3>
            <p>post description ...</p>
          </article>
        </div>

        <Contacs/>
      </div>
    </section>
  );
}

export default Account;
