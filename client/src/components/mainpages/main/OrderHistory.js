import { useContext, useEffect } from "react";
import moment from "moment";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import { instance } from "../../../api/index";
const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.userAPI.token;

  const getHistory = async () => {
    try {
      const res = isAdmin
        ? await instance.get("/api/payment")
        : await instance.get("/user/history");
      setHistory(res.data);
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
        <h2>Order History</h2>
        <Link class="blockchain-btn" to={`/blockchain/history`}>
          View Order details From Blockchain
        </Link>
      </section>
      <h4>You have {history.length} orders</h4>
      <table>
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Date purchased</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item._id}>
              <td>{item.paymentID}</td>
              <td>
                {moment(item.timestamps).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td>
                <Link to={`/history/${item._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
