import { useState } from 'react';
import './styles.scss';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';

import { auth } from '../../firebase/utils';
import { withRouter } from 'react-router-dom';

const EmailPassword = (props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        url: 'http://localhost:3000/login',
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          props.history.push('/login');
        })
        .catch(() => {
          console.log('Something wrong');
        });
    } catch (error) {
      console.log(error);
    }
  };

  const configAuthWrapper = {
    headline: 'Email Password',
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

          <Button type="submit">Send Email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
