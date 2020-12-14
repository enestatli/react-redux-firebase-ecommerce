import './styles.scss';

const Header = (props) => {
  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <img
            src="https://raw.githubusercontent.com/simpletut/React-Redux-Firebase-eCommerce-Website/master/src/assets/logo.png"
            alt="logo"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
