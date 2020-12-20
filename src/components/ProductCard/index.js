import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductStart } from '../../redux/Products/actions';
import './styles.scss';

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const { productName } = useSelector((state) => state.productsData.product);
  const { productID } = useParams();

  useEffect(() => {
    dispatch(fetchProductStart(productID));
  }, []);

  return (
    <div className="productCard">
      <h1>{productName}</h1>
    </div>
  );
};

export default ProductCard;
