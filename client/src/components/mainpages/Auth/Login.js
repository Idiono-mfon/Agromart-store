import { useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api/index";

const Login = () => {
  const [formData, setformData] = useState({ email: "", password: "" });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const { data } = await instance.post("/user/login", { ...formData });
      localStorage.setItem("profile", JSON.stringify(data));
      window.location.href = "/";
      // history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={loginSubmit}>
        <h2>Login Now</h2>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          autoComplete="on"
          value={formData.password}
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
