import './creators.scss';

type creatorType = {
  name: string;
  text: string;
  avatar: string;
  className: string;
  linkedin: string;
  github: string;
}

function Creators () {
  return (
    <ul className='creators list-reset'>
      <Creator className='card' name='Joan Vivó' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' avatar='./img/JoanImg.jpg' linkedin='/joanvs8' github='/joanvs8'/>
      <Creator className='card' name='Nazar Shypot' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' avatar='./img/NazarImg.jpg' linkedin='/nazarshypot' github='/veter391'/>
      <Creator className='card' name='Jose Tipaldi' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' avatar='./img/JoseImg.jpg' linkedin='/joseignaciotipaldi' github='/joseignaciotipaldiok'/>
      <Creator className='card' name='Oscar Fortea' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' avatar='./img/OscarImg.png' linkedin='/oscarfortea' github='/OscarFortea'/>
    </ul>
  );
}

function Creator (props:creatorType) {
  const { name, linkedin, github, avatar } : creatorType = props;

  return (
  <li {...props} >
      <img className="creatorImg" src={avatar} alt="avatar" />
    <div>
      <h2>{name}</h2>
      <div className='socials'>
        <img className="socialLinks" src="././img/githubLogo.png" alt="" />
        <a target="_blank" href={'https://github.com' + github}>{github}</a>
      </div>
      <div className='socials'>
        <img className="socialLinks" src="././img/linkedinLogo.png" alt="" />
        <a target="_blank" href={'https://www.linkedin.com/in' + linkedin}>{linkedin}</a>
      </div>
    </div>
  </li>
  );
}
export default Creators;
