import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../../GlobalState";
const BtnRender = ({ product, deleteProduct }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [isFarmer] = state.userAPI.isFarmer;
  const addCart = state.userAPI.addCart;

  return (
    <div className="row_btn">
      {isAdmin || isFarmer ? (
        <>
          <Link id="btn_buy" to="#" onClick={deleteProduct}>
            Delete
          </Link>
          <Link id="btn_view" to={`/product/edit/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#" onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
