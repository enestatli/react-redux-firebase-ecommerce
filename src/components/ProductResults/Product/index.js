import { Link } from 'react-router-dom';
import Button from './../../Forms/Button';

const Product = ({
  documentID,
  productThumbnail,
  productName,
  productPrice,
}) => {
  if (
    !documentID ||
    !productThumbnail ||
    !productName ||
    typeof productPrice === 'undefined'
  )
    return null;

  const configAddToCartBtn = {
    type: 'button',
  };

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>
      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>{productName}</Link>
            </span>
          </li>

          <li>
            <span className="name">${productPrice}</span>
          </li>

          <div className="addToCart">
            <li>
              <Button {...configAddToCartBtn}>Add to cart</Button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Product;
