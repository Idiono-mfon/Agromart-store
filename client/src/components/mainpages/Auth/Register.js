import { useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../api/index";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    isFarmer: false,
    farmName: "",
    farmAddress: "",
  });

  // const history = useHistory();

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    if (name !== "enableFarm") {
      setUser({ ...user, [name]: value });
    } else {
      setUser({ ...user, isFarmer: e.target.checked });
    }
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
      // history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          autoComplete="on"
          value={user.password}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="confirmPass"
          required
          placeholder="Confirm Password"
          autoComplete="on"
          value={user.confirmPassword}
          onChange={onChangeInput}
        />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <input
            id="enableFarm"
            type="checkbox"
            style={{ width: "20px" }}
            name="enableFarm"
            checked={user.isFarmer}
            onChange={onChangeInput}
          />
          <div className="label-box">
            <label
              style={{
                marginTop: "20px",
                display: "block",
                paddingLeft: "10px",
              }}
              htmlFor="enableFarm"
            >
              Are you are Farmer?
            </label>
          </div>
        </div>
        {user.isFarmer && (
          <>
            <input
              type="text"
              name="farmName"
              required
              placeholder="Your farm Name"
              value={user.farmName}
              onChange={onChangeInput}
            />
            <input
              type="text"
              name="farmAddress"
              required
              placeholder="Your farm address"
              value={user.farmAddress}
              onChange={onChangeInput}
            />
          </>
        )}
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
