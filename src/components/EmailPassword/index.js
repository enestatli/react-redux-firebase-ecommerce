import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';

import AuthWrapper from '../AuthWrapper';
import FormInput from '../Forms/FormInput';
import Button from '../Forms/Button';
import { resetAllAuthForms, resetPassword } from '../../redux/User/actions';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordErrors: user.resetPasswordErrors,
});

const EmailPassword = (props) => {
  const dispatch = useDispatch();
  const { resetPasswordSuccess, resetPasswordErrors } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push('/login');
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordErrors) && resetPasswordErrors.length > 0) {
      setErrors(resetPasswordErrors);
    }
  }, [resetPasswordErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  const configAuthWrapper = {
    headline: 'Email Password',
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => {
              return <li key={index}>{error}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit">Send Email</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
