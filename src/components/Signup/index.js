import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import './styles.scss';

import AuthWrapper from '../AuthWrapper';

import { signUpUserStart } from '../../redux/User/actions';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErrors: user.userErrors,
});

const Signup = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErrors } = useSelector(mapState);

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push('/');
    }
  }, [currentUser]);

  useEffect(() => {
    if (Array.isArray(userErrors) && userErrors.length > 0) {
      setErrors(userErrors);
    }
  }, [userErrors]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUpUserStart({ displayName, email, password, confirmPassword })
    );
  };

  const configAuthWrapper = {
    headline: 'Signup',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors?.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>;
            })}
          </ul>
        )}
        <form onSubmit={formSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            placeholder="Full Name"
            handleChange={(e) => setDisplayName(e.target.value)}
          />

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <FormInput
            type="text"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="Confirm Password"
            handleChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button type="submit">Register</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default Signup;
