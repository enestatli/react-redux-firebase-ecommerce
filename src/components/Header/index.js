import { Link } from 'react-router-dom';
import './styles.scss';
import { auth } from '../../firebase/utils';

const Header = (props) => {
  const { currentUser } = props;

  console.log(currentUser);
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
          {currentUser && (
            <ul>
              <li>
                <span onClick={() => auth.signOut()}>Logout</span>
              </li>
            </ul>
          )}

          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;