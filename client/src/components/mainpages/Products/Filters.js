import { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
const Filters = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoryAPI.categories;
  //   const [products, setProducts] = state.productsAPI.products;
  const [category, setCategory] = state.productsAPI.category;
  const [sort, setSort] = state.productsAPI.sort;
  const [search, setSearch] = state.productsAPI.search;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setSearch("");
  };
  //   const [page, setPage] = state.productsAPI.products;
  //   const [result, setResult] = state.productsAPI .products;

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Filters:</span>
        <select name="category" onChange={handleCategory}>
          <option value="">All Products</option>
          {categories.map((category) => (
            <option value={"category=" + category._id} key={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={search}
        placeholder="Enter your search"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />
      <div className="row sort">
        <span>Sort By:</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">Newest</option>
          <option value="sort=oldest">Oldest</option>
          <option value="sort=-sold">Best Sales</option>
          <option value="sort=-price">Price: High-Low</option>
          <option value="sort=price">Price: Low-High</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
