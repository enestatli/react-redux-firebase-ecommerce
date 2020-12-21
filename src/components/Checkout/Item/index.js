const Item = (product) => {
  const {
    productName,
    productThumbnail,
    productPrice,
    quantity,
    documentID,
  } = product;
  return (
    <table className="cartItem" border="0" cellSpacing="0" cellPadding="10">
      <tbody>
        <tr>
          <td>
            <img src={productThumbnail} alt={productName} />
          </td>
          <td>{productName}</td>
          <td>
            <span className="cartBtn">{`< `}</span>
            <span>{quantity}</span>
            <span className="cartBtn">{` >`}</span>
          </td>
          <td>£{productPrice}</td>
          <td align="center">
            <span className="cartBtn">X</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Item;
