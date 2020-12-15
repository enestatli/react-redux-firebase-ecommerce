import Footer from '../components/Footer';
import Header from '../components/Header';

const HomeLayout = (props) => {
  return (
    <div className="fullHeight">
      <Header {...props} />
      {props.children}
      <Footer />
    </div>
  );
};

export default HomeLayout;
