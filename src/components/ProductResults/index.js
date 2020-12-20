import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchProductsStart } from '../../redux/Products/actions';
import Product from './Product';
import FormSelect from './../Forms/FormSelect';
import './styles.scss';
import { useHistory, useParams } from 'react-router-dom';
import LoadMore from '../LoadMore';

const ProductResults = ({}) => {
  const dispatch = useDispatch();
  const { data, queryDoc, isLastPage } = useSelector(
    ({ productsData }) => productsData.products
  );
  const history = useHistory();
  const { filterType } = useParams();

  useEffect(() => {
    dispatch(fetchProductsStart({ filterType }));
  }, [filterType]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value;
    history.push(`/search/${nextFilter}`);
  };

  if (!Array.isArray(data)) return null;

  if (data.length < 1) {
    return (
      <div className="products">
        <p>No search results.</p>
      </div>
    );
  }

  const configFilters = {
    defaultValue: filterType,
    options: [
      { name: 'Show all', value: '' },
      { name: 'Mens', value: 'mens' },
      { name: 'Women', value: 'womens' },
    ],
    handleChange: handleFilter,
  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  return (
    <div className="products">
      <h1>BROWSE PRODUCTS</h1>
      <FormSelect {...configFilters} />

      <div className="productResults">
        {data.map((product, index) => {
          const { productThumbnail, productName, productPrice } = product;

          if (
            !productThumbnail ||
            !productName ||
            typeof productPrice === 'undefined'
          )
            return null;

          const configProduct = {
            ...product,
          };

          return <Product {...configProduct} key={index} />;
        })}
      </div>

      {!isLastPage && <LoadMore {...configLoadMore} />}
    </div>
  );
};

export default ProductResults;
