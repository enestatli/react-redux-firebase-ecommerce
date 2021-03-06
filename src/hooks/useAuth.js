import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useAuth = (props) => {
  const history = useHistory();
  const currentUser = useSelector(({ user }) => user.currentUser);

  useEffect(() => {
    if (!currentUser) {
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
