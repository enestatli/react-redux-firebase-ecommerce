import { useState } from 'react';
import { auth, signInWithGoogle } from '../../firebase/utils';
import AuthWrapper from '../AuthWrapper';
import Button from '../Forms/Button';
import FormInput from '../Forms/FormInput';
import './styles.scss';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="text"
            name="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Log In</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
