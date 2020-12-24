import './styles.scss';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

const handleFormSubmit = async (evt) => {
  evt.preventDefault();
};

const PaymentDetails = () => {
  return (
    <div className="paymentDetails">
      <form className={handleFormSubmit}>
        {/* shipping */}
        <div className="group">
          <h2>Shipping Address</h2>
          <FormInput type="text" placeholder="Reciepient Name" />
          <FormInput type="text" placeholder="Line 1" />
          <FormInput type="text" placeholder="Line 2" />
          <FormInput type="text" placeholder="City" />
          <FormInput type="text" placeholder="State" />
          <FormInput type="text" placeholder="Postal Code" />
        </div>
        {/* billing */}
        <div className="group">
          <h2>Billing Address</h2>
          <FormInput type="text" placeholder="Name on Card" />
          <FormInput type="text" placeholder="Line 1" />
          <FormInput type="text" placeholder="Line 2" />
          <FormInput type="text" placeholder="City" />
          <FormInput type="text" placeholder="State" />
          <FormInput type="text" placeholder="Postal Code" />
        </div>
        {/* cart details */}
        <div className="group">
          <h2>Cart Details</h2>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
