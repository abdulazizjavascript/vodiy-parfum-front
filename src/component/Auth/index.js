import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LockIcon from "@material-ui/icons/Lock";
import Loader from "react-loader-spinner";
import axios from "axios";
import "./style-auth.css";

const Auth = () => {
  const [user, setUser] = useState({
    login: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user }).then((res) => {
        if (res.data.user.role === 1) {
          toast.error("Siz foydalanuvchi emassiz !");
        } else {
          localStorage.setItem("Login", true);

          window.location.href = "/main";
          toast.success("Muvafaqqiyatli kirdingiz !");
        }
        setLoader(false);
      });
    } catch (err) {
      toast.error(err.response.data.msg, { autoClose: 1000 });
      setLoader(false);
    }
  };
  useEffect(() => {
    localStorage.removeItem("Login");
  }, []);
  return (
    <div className="auth-wrapper" method="post">
      <form className="auth-form" onSubmit={loginSubmit}>
        <span className="auth-form-icon-wrapper">
          <LockIcon color="secondary" fontSize="large" />
        </span>
        <Loader
          style={loader ? { display: "inline" } : { display: "none" }}
          type="ThreeDots"
          color="#00BFFF"
          height={40}
          width={40}
          timeout={3000} //3 secs
        />
        <h3>Tizimga kirish</h3>
        <input
          name="login"
          placeholder="login"
          className="input-style"
          onChange={onChangeInput}
        />
        <input
          name="password"
          placeholder="parol"
          className="input-style"
          onChange={onChangeInput}
        />
        <button
          type="submit"
          className="btn-style"
          // onClick={handleSubmitClick}
        >
          Kirish
        </button>
      </form>
    </div>
  );
};

export default Auth;
