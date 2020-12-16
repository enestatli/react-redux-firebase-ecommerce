import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
  resetAllAuthForms,
  signInUser,
  signInWithGoogle,
} from '../../redux/User/actions';

import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import './styles.scss';

const mapState = ({ user }) => ({
  signInSuccess: user.signInSuccess,
});

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const configAuthWrapper = {
    headline: 'Login',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
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

          <Button type="submit">Log In</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Reset Password</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(SignIn);
