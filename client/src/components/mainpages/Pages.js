import { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

import Products from "./Products/Products";
import DetailProduct from "./DetailProduct/DetailProduct";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import OrderHistory from "./History/OrderHistory";
import OrderDetails from "./History/OrderDetails";
import Cart from "./Cart/Cart";
import NotFound from "../mainpages/utils/NotFound/NotFound";
import Categories from "../mainpages/Categories/Categories";
import CreateProduct from "../mainpages/CreateProduct/CreateProduct";
import OrderHistoryBlockchain from "../mainpages/History/OrderHistoryBlockchain";
import OrderDetailsBlockchain from "../mainpages/History/OrderDetailsBlockchain";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLoggedIn] = state.userAPI.isLoggedIn;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isFarmer] = state.userAPI.isFarmer;

  return (
    <Switch>
      <Route path="/" exact component={Products}></Route>
      <Route path="/detail/:id" exact component={DetailProduct}></Route>
      <Route
        path="/login"
        exact
        component={isLoggedIn ? NotFound : Login}
      ></Route>{" "}
      <Route
        path="/product/create"
        exact
        component={isAdmin || isFarmer ? CreateProduct : NotFound}
      ></Route>
      <Route
        path="/product/edit/:id"
        exact
        component={isAdmin || isFarmer ? CreateProduct : NotFound}
      ></Route>
      <Route
        path="/register"
        exact
        component={isLoggedIn ? NotFound : Register}
      ></Route>
      <Route
        path="/category"
        exact
        component={isAdmin ? Categories : NotFound}
      ></Route>
      <Route
        path="/history"
        exact
        component={isLoggedIn ? OrderHistory : NotFound}
      ></Route>
      <Route
        path="/history/:id"
        exact
        component={isLoggedIn ? OrderDetails : NotFound}
      ></Route>
      <Route
        path="/blockchain/history"
        exact
        component={isAdmin ? OrderHistoryBlockchain : NotFound}
      ></Route>
      <Route
        path="/blockchain/history/:id"
        exact
        component={isAdmin ? OrderDetailsBlockchain : NotFound}
      ></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path="*" component={NotFound}></Route>
    </Switch>
  );
};

export default Pages;
