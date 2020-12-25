import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrderHistory } from '../../redux/Orders/actions';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
