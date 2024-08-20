import logoSvg from '../assets/img/pizza-logo.svg'
import {Link} from 'react-router-dom';
function Header() {
  return (
    <Link to="/">
      <div className="header__logo">
        <img width="38" src={logoSvg} alt="Pizza logo"/>
        <div>
          <h1>Romio Pizza</h1>
          <p>самая вкусная пицца в этом секторе галактики</p>
        </div>
      </div>
    </Link>
  );
}

export default Header