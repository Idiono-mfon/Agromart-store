import { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { instance } from "../../../api/index";
import ProductItem from "../utils/ProductItem/ProductItem.js";
import Loading from "../utils/Loading/Loading";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

const Products = () => {
  const state = useContext(GlobalState);

  const [isAdmin] = state?.userAPI?.isAdmin;
  const [isFarmer] = state.userAPI?.isFarmer;
  const [user] = state.userAPI?.user;
  const [products, setProducts] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = instance.post("/api/destroy", {
        public_id,
      });
      const deleteProduct = instance.delete(`/api/products/${id}`);

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleClick = (id) => {
    if (isFarmer) {
      const filteredProducts = products.filter((product) => {
        return product.owner._id === user._id;
      });
      filteredProducts.forEach((product) => {
        if (product._id === id) product.checked = !product.checked;
      });
      setProducts([...filteredProducts]);
    } else {
      products.forEach((product) => {
        if (product._id === id) product.checked = !product.checked;
      });
      setProducts([...products]);
    }
  };

  const checkAll = () => {
    if (isFarmer) {
      // Famer operation
      const filteredProducts = products.filter((product) => {
        return product.owner._id === user._id;
      });
      filteredProducts.forEach((product) => {
        product.checked = !isChecked;
      });
      setProducts([...filteredProducts]);
      setIsChecked(!isChecked);
    } else {
      // Administrator operation
      products.forEach((product) => {
        product.checked = !isChecked;
      });
      setProducts([...products]);
      setIsChecked(!isChecked);
    }
  };

  const deleteAll = () => {
    if (isFarmer) {
      const filteredProducts = products.filter((product) => {
        return product.owner._id === user._id;
      });
      filteredProducts.forEach((product) => {
        if (product.checked)
          deleteProduct(product._id, product.images.public_id);
      });
      setIsChecked(false);
    } else {
      products.forEach((product) => {
        if (product.checked)
          deleteProduct(product._id, product.images.public_id);
      });
      setIsChecked(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <>
      <Filters />
      {(isAdmin || isFarmer) && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isChecked} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}
      <div className="products">
        {isFarmer
          ? products.map((product) => {
              if (product.owner._id === user._id) {
                return (
                  <ProductItem
                    key={product._id}
                    product={product}
                    isAdmin={isAdmin}
                    isFarmer={isFarmer}
                    deleteProduct={deleteProduct}
                    handleClick={handleClick}
                  />
                );
              }
            })
          : products.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  isFarmer={isFarmer}
                  deleteProduct={deleteProduct}
                  handleClick={handleClick}
                />
              );
            })}
      </div>
      <LoadMore />
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
