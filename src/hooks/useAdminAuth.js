import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { checkUserIsAdmin } from '../utils';

const useAdminAuth = (props) => {
  const currentUser = useSelector(({ user }) => user.currentUser);
  const history = useHistory();

  useEffect(() => {
    if (!checkUserIsAdmin(currentUser)) {
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default useAdminAuth;
