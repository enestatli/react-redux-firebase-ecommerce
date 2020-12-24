import { CountryDropdown } from 'react-country-region-selector';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import { useEffect, useState } from 'react';
import './styles.scss';
import { apiInstance } from '../../utils';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartTotal,
  selectCartCartItemsCount,
} from './../../redux/Cart/selectors';
import { clearCart } from '../../redux/Cart/actions';
import { useHistory } from 'react-router-dom';

const initalAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
};

const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartCartItemsCount,
});

const PaymentDetails = () => {
  const { total, itemCount } = useSelector(mapState);
  const dispatch = useDispatch();
  const elements = useElements();
  const stripe = useStripe();
  const history = useHistory();
  const [billingAddress, setBillingAddress] = useState({
    ...initalAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initalAddressState,
  });
  const [recipientName, setRecipientName] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  useEffect(() => {
    if (itemCount < 1) {
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

  const handleShipping = (evt) => {
    const { name, value } = evt.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const handleBilling = (evt) => {
    const { name, value } = evt.target;
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    });
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    const cardElement = elements.getElement('card');

    if (
      !shippingAddress.line1 ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.postal_code ||
      !shippingAddress.country ||
      !billingAddress.line1 ||
      !billingAddress.city ||
      !billingAddress.state ||
      !billingAddress.postal_code ||
      !billingAddress.country ||
      !recipientName ||
      !nameOnCard
    ) {
      return;
    }

    apiInstance
      .post('/payments/create', {
        amount: total * 100,
        shipping: {
          name: recipientName,
          address: {
            ...shippingAddress,
          },
        },
      })
      .then(({ data: clientSecret }) => {
        stripe
          .createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
              name: nameOnCard,
              address: {
                ...billingAddress,
              },
            },
          })
          .then(({ paymentMethod }) => {
            stripe
              .confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
              })
              .then(({ paymentIntent }) => {
                dispatch(clearCart());
              });
          });
      });
  };

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px',
      },
    },
    hidePostalCode: true,
  };

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        {/* shipping */}
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput
            required
            type="text"
            placeholder="Reciepient Name"
            name="recipientName"
            value={recipientName}
            handleChange={(e) => setRecipientName(e.target.value)}
          />
          <FormInput
            required
            type="text"
            placeholder="Line 1"
            name="line1"
            value={shippingAddress.line1}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            type="text"
            placeholder="Line 2"
            name="line2"
            value={shippingAddress.line2}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="City"
            name="city"
            value={shippingAddress.city}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="State"
            name="state"
            value={shippingAddress.state}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={shippingAddress.postal_code}
            handleChange={(e) => handleShipping(e)}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              value={shippingAddress.country}
              onChange={(val) =>
                handleShipping({ target: { name: 'country', value: val } })
              }
            />
          </div>
        </div>
        {/* billing */}
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput
            required
            type="text"
            placeholder="Name on Card"
            name="nameOnCard"
            value={nameOnCard}
            handleChange={(e) => setNameOnCard(e.target.value)}
          />
          <FormInput
            required
            type="text"
            placeholder="Line 1"
            name="line1"
            value={billingAddress.line1}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            type="text"
            placeholder="Line 2"
            name="line2"
            value={billingAddress.line2}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="City"
            name="city"
            value={billingAddress.city}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="State"
            name="state"
            value={billingAddress.state}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            required
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={billingAddress.postal_code}
            handleChange={(e) => handleBilling(e)}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              value={billingAddress.country}
              onChange={(val) =>
                handleBilling({ target: { name: 'country', value: val } })
              }
            />
          </div>
        </div>
        {/* cart details */}
        <div className="group">
          <h2>Cart Details</h2>

          <CardElement options={configCardElement} />
        </div>

        <Button type="submit">Pay Now</Button>
      </form>
    </div>
  );
};

export default PaymentDetails;
