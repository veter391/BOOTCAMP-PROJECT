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

        <ul className="account__followers">
          <li>follower</li>
          <li>follower</li>
          <li>follower</li>
        </ul>
      </div>
    </section>
  );
}

export default Account;
