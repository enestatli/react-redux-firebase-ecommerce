import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart } from '../../redux/Products/actions';
import './styles.scss';

// const mapState = ({productsData}) => ({
//   products: pr
// })

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const products = useSelector(({ productsData }) => productsData.products);

  useEffect(() => {
    dispatch(fetchProductsStart());
    console.log(products);
  }, []);

  if (Array.isArray(products)) return null;

  if (products.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  return (
    <div className="products">
      {products.map((product, index) => {
        const { productThumbnail, productName, productPrice } = product;

        if (
          !productThumbnail ||
          !productName ||
          typeof productPrice === 'undefined'
        )
          return null;

        return (
          <div key={index}>
            {productName}
            {productPrice}
          </div>
        );
      })}
    </div>
  );
};

export default ProductResults;
