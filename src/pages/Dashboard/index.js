import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderHistory from '../../components/OrderHistory';
import { getUserOrderHistory } from '../../redux/Orders/actions';
import './styles.scss';

const mapState = ({ user, ordersData }) => ({
  currentUser: user.currentUser,
  orderHistory: ordersData.orderHistory.data,
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser, orderHistory } = useSelector(mapState);

  useEffect(() => {
    dispatch(getUserOrderHistory(currentUser.id));
  }, []);

  return (
    <div>
      <h1>Order History</h1>

      <OrderHistory orders={orderHistory} />
    </div>
  );
};

export default Dashboard;
