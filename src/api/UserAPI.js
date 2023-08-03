import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
        } catch (err) {
          toast.error(err.response.data.msg, { autoClose: 1000 });
        }
      };
      getUser();
      // setCallback(!callback);
    }
  }, [token, callback]);

  const addCart = async (product) => {
    if (!isLogged) return toast.error("Login Parol", { autoClose: 1000 });

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      toast.success("Savatchaga qo'shildi", { autoClose: 1000 });
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/addcart",
        { cart: [...cart, { ...product, quantity: 1, comment: '' }] },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
    } else {
      toast.info("Bu mahsulot kartda qo'shilgan", { autoClose: 2000 });
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    callback: [callback, setCallback],
    addCart: addCart,
    history: [history, setHistory],
  };
}

export default UserAPI;
