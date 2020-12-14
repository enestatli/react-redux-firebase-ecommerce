import { Link } from 'react-router-dom';
import './styles.scss';

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/">
            <img
              src="https://raw.githubusercontent.com/simpletut/React-Redux-Firebase-eCommerce-Website/master/src/assets/logo.png"
              alt="logo"
            />
          </Link>
        </div>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/registration">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
