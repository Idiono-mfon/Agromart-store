import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../.../../../../GlobalState";
import { instance } from "../../../api/index";
import PaypalButton from "../Cart/PaypalButton";
import createContract from "../../../ethereum/agromartContract";
import { web3 } from "../../../ethereum/web3";
import { strToBase32 } from "../../../ethereum/functions";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state?.userAPI?.cart;
  const [total, setTotal] = useState(0);
  const [token] = state?.userAPI?.token;

  // Create a contract instance
  const contract = createContract();

  const addToCart = async (cart) => {
    if (token) {
      await instance.patch("/user/addCart", { cart });
    }
  };

  const orderAddressToBlockchain = async ({
    recipient_name: reciepientName,
    line1,
    city,
    postal_code: postalCode,
    country_code: countryCode,
  }) => {
    // Retrieve accounts link to the provider
    const accounts = await web3.eth.getAccounts();
    // Set the payment address
    try {
      await contract.methods
        .setAddress(
          strToBase32(reciepientName),
          strToBase32(line1),
          strToBase32(city),
          strToBase32(postalCode),
          strToBase32(countryCode)
        )
        .send({
          from: accounts[0],
          gas: 5000000,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const orderDataToBlockchain = async ({
    name: username,
    email,
    paymentID: paymentId,
    timestamps,
  }) => {
    const accounts = await web3.eth.getAccounts();
    try {
      await contract.methods
        .setPayment(
          strToBase32(paymentId),
          strToBase32(username),
          strToBase32(email),
          strToBase32(timestamps)
        )
        .send({
          from: accounts[0],
          gas: 5000000,
        });
    } catch (err) {
      console.log(err);
    }
  };

  const orderProductToBlockchain = async (data) => {
    const accounts = await web3.eth.getAccounts();
    data.cart.forEach(
      async ({ _id, title, price, quantity, images: { url: image } }) => {
        try {
          await contract.methods
            .setProduct(
              strToBase32(_id),
              strToBase32(title),
              price,
              quantity,
              strToBase32("Hello just a test")
            )
            .send({
              from: accounts[0],
              gas: 5000000,
            });
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      const filteredCart = cart.filter((item) => item._id !== id);
      setCart([...filteredCart]);
      addToCart(filteredCart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;
    const currentOrder = await instance.post("/api/payment", {
      cart,
      paymentID,
      address,
    });

    // Submit payment address to blockchain
    await orderAddressToBlockchain(currentOrder.data.address);
    // Submit payment details to blockchian
    await orderDataToBlockchain(currentOrder.data);
    // Submit payment cart info to blockchain
    await orderProductToBlockchain(currentOrder.data);
    // Launch payment details to blockchain Here:

    setCart([]);
    addToCart([]);
    alert("You have placed an order");
    // For re-rendering the history component after successfull transaction
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((result, item) => {
        return result + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "3rem" }}>Cart is Empty</h2>
    );

  return (
    <div>
      {cart.map((product) => (
        <div key={product._id} className="detail cart">
          <img src={product.images.url} className="img_container" alt="" />
          <div className="box-detail">
            <h2>{product.title}</h2>
            <h6>SKU: {product.product_id}</h6>
            <h3>
              <span className="currency">N</span>
              {product.price * product.quantity}
            </h3>
            <p>{product.description}</p>
            <p>{product.content}</p>
            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>
            <div onClick={() => removeProduct(product._id)} className="delete">
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>
          Total: <span className="currency">N {total}</span>
        </h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
};

export default Cart;
