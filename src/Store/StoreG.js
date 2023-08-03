import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import CategoriesAPI from "../api/CategoriesAPI";
import ProductsAPI from "../api/ProductsAPI";
import UserAPI from "../api/UserAPI";

export const StoreContext = createContext();

const StoreG = (props) => {

  const [navFooter, setNavFooter] = useState(false);

  const [token, setToken] = useState(false);

  useEffect(() => {
    const Login = localStorage.getItem("Login");
    if (Login) {
      const refreshToken = async () => {
        const res = await axios.get("/user/refresh_token");

        setToken(res.data.accesstoken);
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    categoriesAPI: CategoriesAPI(),
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    setNavFooter,
    navFooter
  };
  return (
    <StoreContext.Provider value={state}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreG;
