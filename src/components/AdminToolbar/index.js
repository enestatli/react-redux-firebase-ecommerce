import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { checkUserIsAdmin } from '../../utils';
import './styles.scss';

const AdminToolbar = (props) => {
  const currentUser = useSelector(({ user }) => user.currentUser);

  const isAdmin = checkUserIsAdmin(currentUser);
  if (!isAdmin) return null;

  return (
    <div className="adminToolbar">
      <ul>
        <li>
          <Link to="/admin">My Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminToolbar;
