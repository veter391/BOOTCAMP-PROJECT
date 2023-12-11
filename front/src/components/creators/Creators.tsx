import './creators.scss';

type creatorType = {
  name: string;
  text: string;
  creatorImg: string;
  className: string;
  linkedIn: string;
  gitHub: string;
}

function Creators () {
  return (
    <ul className='creators list-reset'>
      <Creator className='card' name='Joan Vivó' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' creatorImg='././public/img/JoanImg.jpg' linkedIn='/joanvs8' gitHub='/joanvs8'/>
      <Creator className='card' name='Nazar Shypot' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' creatorImg='././public/img/NazarImg.jpg' linkedIn='/nazar-shypot-192ba6292/' gitHub='/veter391'/>
      <Creator className='card' name='Jose Tipaldi' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' creatorImg='././public/img/JoseImg.jpg' linkedIn='/joseignaciotipaldi' gitHub='/joseignaciotipaldiok'/>
      <Creator className='card' name='Oscar Fortea' text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, blanditiis?' creatorImg='././img/OscarImg.png' linkedIn='/oscarfortea' gitHub='/OscarFortea'/>
    </ul>
  );
}

function Creator (props:creatorType) {
  const { name, linkedIn, gitHub, creatorImg } : creatorType = props;

  return (
  <li {...props} >
    <img className="creatorImg" src={creatorImg} alt="avatar" />
    <div>
      <h2>{name}</h2>
      <div className='socials'>
        <img className="socialLinks" src="././img/githubLogo.png" alt="" />
        <a target="_blank" href={'https://github.com' + gitHub}>{gitHub}</a>
      </div>
      <div className='socials'>
        <img className="socialLinks" src="././img/linkedinLogo.png" alt="" />
        <a target="_blank" href={'https://www.linkedin.com/in' + linkedIn}>{linkedIn}</a>
      </div>
    </div>
  </li>
  );
}
export default Creators;
