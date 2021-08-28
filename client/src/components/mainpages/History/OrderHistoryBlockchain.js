import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import createContract from "../../../ethereum/agromartContract";
import { base32ToStr, strToBase32 } from "../../../ethereum/functions";
const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.userAPI.token;
  const [title, setTitle] = useState("");

  const contract = createContract();

  const getAddressesFromBlockchain = async (paymentObj) => {
    const rawaAddress = await contract.methods.getAllAddress().call();
    const {
      0: reciepientName,
      1: line1,
      2: city,
      3: postalCode,
      4: countryCode,
    } = rawaAddress;

    reciepientName.forEach((item, index) => {
      const address = {
        reciepientName: base32ToStr(reciepientName[index]),
        line1: base32ToStr(line1[index]),
        city: base32ToStr(city[index]),
        postalCode: base32ToStr(postalCode[index]),
        countryCode: base32ToStr(countryCode[index]),
      };

      paymentObj[index].address = address;
    });

    return paymentObj;
  };

  const getProductsFromBlockchain = async (paymentObj) => {
    paymentObj.forEach(async (paymentItem) => {
      //   let tempCart = [];
      const rawProducts = await contract.methods
        .getProducts(strToBase32(paymentItem.paymentId))
        .call();
      paymentItem.cart = [];
      const {
        0: _id,
        1: title,
        2: price,
        3: quantity,
        4: images,
      } = rawProducts;
      _id.forEach((prodcutItem, index) => {
        const product = {
          _id: base32ToStr(_id[index]),
          title: base32ToStr(title[index]),
          price: price[index],
          quantity: quantity[index],
          images: base32ToStr(images[index]),
        };
        paymentItem.cart.push(product);
      });
    });

    return paymentObj;
  };

  const getHistory = async () => {
    try {
      // Set Page title by retrieving contract name
      const name = await contract.methods.name().call();
      setTitle(name);

      /**Get Order information */
      const rawPayments = await contract.methods.getPayments().call();

      const tempArray = []; //storing payment details temporary

      const {
        0: paymentId,
        1: userName,
        2: email,
        3: timeStamps,
      } = rawPayments;

      paymentId.forEach((item, index) => {
        const payment = {
          paymentId: base32ToStr(paymentId[index]),
          username: base32ToStr(userName[index]),
          email: base32ToStr(email[index]),
          timestamps: base32ToStr(timeStamps[index]),
        };
        tempArray.push(payment);
      });

      //   Retrieve payment address
      await getAddressesFromBlockchain(tempArray);
      //   Retrieve payment product in cart
      await getProductsFromBlockchain(tempArray);
      setHistory(tempArray);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (token) {
      getHistory();
    }
  }, [token, isAdmin]);

  return (
    <div className="history-page">
      <section className="section-header">
        <h2 style={{ fontSize: "17px" }}>{title}</h2>
        <img
          src={`https://res.cloudinary.com/idysman/image/upload/v1621308308/test/iconBlockchain_vglrhx.png`}
          alt="Blockchain"
        />
        <Link className="blockchain-btn" to={`/history`}>
          View Order details From Database
        </Link>
      </section>
      <h4>You have {history.length} orders</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date purchased</th>
            <th>Username</th>
            <th>Email</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.paymentId}</td>
              <td>
                {moment(item.timestamps).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>
                <Link to={`/blockchain/history/${item.paymentId}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
