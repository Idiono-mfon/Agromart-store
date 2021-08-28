import { useState, useEffect } from "react";
// import axios from "axios";
import { instance } from "./index";
const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await instance.get(
          `/api/products?limit=${
            page * 16
          }&${category}&${sort}&title[regex]=${search}`
        );
        setProducts(res.data.products);
        setResult(res.data.result);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [callback, category, sort, search, page]);
  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default useProduct;
