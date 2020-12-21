import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addProduct } from '../../redux/Cart/actions';
import { fetchProductStart, setProduct } from '../../redux/Products/actions';

import Button from './../../components/Forms/Button';
import './styles.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) => state.productsData.product);
  const { productID } = useParams();
  const { productName, productThumbnail, productPrice, productDesc } = product;

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  const configAddtoCartBtn = {
    type: 'button',
  };

  const handleAddToCart = (product) => {
    if (!product) return;
    dispatch(addProduct(product));
    history.push('/cart');
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
              <Button
                {...configAddtoCartBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </li>

          <li>
            <span dangerouslySetInnerHTML={{ __html: productDesc }}></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCard;
