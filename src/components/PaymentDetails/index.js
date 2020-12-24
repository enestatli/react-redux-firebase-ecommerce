import { CountryDropdown } from 'react-country-region-selector';
import { CardElement } from '@stripe/react-stripe-js';

import './styles.scss';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';
import { useState } from 'react';

const initalAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
};

const PaymentDetails = () => {
  const [billingAddress, setBillingAddress] = useState({
    ...initalAddressState,
  });
  const [shippingAddress, setShippingAddress] = useState({
    ...initalAddressState,
  });
  const [recipientName, setRecipientName] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

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
      <form className={handleFormSubmit}>
        {/* shipping */}
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput
            type="text"
            placeholder="Reciepient Name"
            name="recipientName"
            value={recipientName}
            handleChange={(e) => setRecipientName(e.target.value)}
          />
          <FormInput
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
            type="text"
            placeholder="City"
            name="city"
            value={shippingAddress.city}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            type="text"
            placeholder="State"
            name="state"
            value={shippingAddress.state}
            handleChange={(e) => handleShipping(e)}
          />
          <FormInput
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={shippingAddress.postal_code}
            handleChange={(e) => handleShipping(e)}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
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
            type="text"
            placeholder="Name on Card"
            name="nameOnCard"
            value={nameOnCard}
            handleChange={(e) => setNameOnCard(e.target.value)}
          />
          <FormInput
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
            type="text"
            placeholder="City"
            name="city"
            value={billingAddress.city}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            type="text"
            placeholder="State"
            name="state"
            value={billingAddress.state}
            handleChange={(e) => handleBilling(e)}
          />
          <FormInput
            type="text"
            placeholder="Postal Code"
            name="postal_code"
            value={billingAddress.postal_code}
            handleChange={(e) => handleBilling(e)}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
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
      </form>
    </div>
  );
};

export default PaymentDetails;
