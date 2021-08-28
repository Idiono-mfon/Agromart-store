import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import decode from "jwt-decode";
import { GlobalState } from "../../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";

const Header = () => {
  // const location = useLocation();
  // const history = useHistory();
  const state = useContext(GlobalState);
  const [user] = state.userAPI?.user;
  const [isLoggedIn, setIsLoggedIn] = state.userAPI?.isLoggedIn;
  const [isAdmin, setIsAdmin] = state.userAPI?.isAdmin;
  const [isFarmer, setIsFarmer] = state.userAPI?.isFarmer;
  const [cart, setCart] = state.userAPI?.cart;
  const token = user?.accessToken;
  const [menu, setMenu] = useState(false);

  //console.log(isAdmin);

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/product/create">Create Product</Link>
        </li>
        {isAdmin && (
          <li>
            <Link to="/category">Categories</Link>
          </li>
        )}
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logOut}>
            Logout
          </Link>
        </li>
        <li>
          <span style={{ display: "inline-block", fontWeight: "500" }}>
            Welcome,{" "}
            {user.name.slice(0, user.name.indexOf(" ") + 1).toUpperCase()}
          </span>
          <span
            style={{
              width: "40px",
              height: "40px",
              background: "#1F4010",
              display: "inline-block",
              textAlign: "center",
              borderRadius: "50%",
              fontSize: "25px",
              fontWeight: "600",
              marginLeft: "13px",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </span>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  const logOut = () => {
    localStorage.clear();
    setIsAdmin(false);
    setIsLoggedIn(false);
    setCart([]);
    isFarmer && setIsFarmer(false);
    // history.push("/");
  };

  useEffect(() => {
    if (token) {
      // Verify validity of the token
      const decodeToken = decode(token);
      // Handle Logout
      decodeToken.exp * 1000 < new Date().getTime() && logOut();
      // Update the state
      //setUser(JSON.parse(localStorage.getItem("profile")));
    }
  }, [token]);

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/"> {isAdmin || isFarmer ? "Admin" : "AgroMart"}</Link>
        </h1>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin || isFarmer ? "Products" : "Shop"}</Link>
        </li>
        {(isAdmin || isFarmer) && adminRouter()}
        {isLoggedIn ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login/ Register</Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin || isFarmer ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} width="30" alt="" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
