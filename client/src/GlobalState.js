import { createContext, useState } from "react";
import useUser from "./api/useUser";
import useProduct from "./api/useProduct";
import useCategory from "./api/useCategory";

// create a context
export const GlobalState = createContext(null);

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("profile"))?.accessToken || false
  );
  const state = {
    productsAPI:  useProduct(),
    userAPI: useUser(token),
    categoryAPI: useCategory(),
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
