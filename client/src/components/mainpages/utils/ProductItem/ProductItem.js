import BtnRender from "./BtnRender";

const ProductItem = ({
  product,
  isAdmin,
  isFarmer,
  deleteProduct,
  handleClick,
}) => {
  return (
    <div className="product_card">
      {isAdmin ||
        (isFarmer && (
          <input
            type="checkbox"
            checked={product.checked}
            onChange={() => handleClick(product._id)}
          />
        ))}
      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>N {product.price}</span>
        <p>{product.description}</p>
      </div>
      <BtnRender
        product={product}
        deleteProduct={() =>
          deleteProduct(product._id, product.images.public_id)
        }
      />
    </div>
  );
};

export default ProductItem;
