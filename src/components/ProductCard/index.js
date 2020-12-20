import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductStart, setProduct } from '../../redux/Products/actions';

import Button from './../../components/Forms/Button';
import './styles.scss';

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const { productName, productThumbnail, productPrice } = useSelector(
    (state) => state.productsData.product
  );
  const { productID } = useParams();

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddtoCartBtn = {
    type: 'button',
  };

  return (
    <div className="productCard">
      <div className="hero">
        <img src={productThumbnail} alt={productName} />
      </div>

      <div className="productDetails">
        <ul>
          <li>
            <h1>{productName}</h1>
          </li>

          <li>
            <h1>${productPrice}</h1>
          </li>

          <li>
            <div className="addToCart">
              <Button {...configAddtoCartBtn}>Add to cart</Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
