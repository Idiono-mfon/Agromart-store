import { useState, useEffect } from "react";
import { instance } from "./index";

const useUser = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isFarmer, setIsFarmer] = useState(false);
  const [user, setUser] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);

  const addCart = async (product) => {
    if (!isLoggedIn) return alert("Please Login to continue buying");

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await instance.patch("/user/addcart", {
        cart: [...cart, { ...product, quantity: 1 }],
      });
    } else {
      alert("This product is already added to cart");
    }
  };

  const getUser = async () => {
    try {
      const res = await instance.get("/user/info");
      setUser(res.data);
      setIsLoggedIn(res?.data ? true : false);
      setIsAdmin(res?.data?.role === 1 ? true : false);
      setIsFarmer(res?.data?.role === 2 ? true : false);
      setCart(res?.data?.cart);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  // const getHistory = async () => {
  //   try {
  //     const res = isAdmin
  //       ? await instance.get("/api/payment")
  //       : await instance.get("/user/history");
  //     setHistory(res.data);
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     getHistory();
  //   }
  // }, [token, callback, isAdmin]);

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    isFarmer: [isFarmer, setIsFarmer],
    addCart: addCart,
    cart: [cart, setCart],
    user: [user, setUser],
    token: [token],
    history: [history, setHistory],
  };
};

export default useUser;
