import React, { useState, useEffect, useContext } from "react";
import TextTruncate from "react-text-truncate";
import { withRouter, useHistory } from "react-router-dom";
import { StoreContext } from "../Store/StoreG";
import FadeIn from "react-fade-in";
import ScrollAnimation from "react-animate-on-scroll";
import SimpleModal from "./Modalbtn";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import axios from "axios";
import { toast } from "react-toastify";

const ShopCart = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = "Parfume Center | Savatcha";
    const checking = localStorage.getItem("Login");
    if (!checking || checking !== "true") {
      history.push("/");
      history.go();
    }
    console.log("shopCart");
  }, [history]);

  const [loader, setLoader] = useState(false);

  const state = useContext(StoreContext);

  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [comment, setComment] = useState("");
  const [categories] = state.categoriesAPI.categories;
  // const [id, setId] = useState(null);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * (item.quantity ? item.quantity : 0);
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const getNumber = (e, id) => {
    const value = parseInt(e.target.value);
    cart.forEach((item) => {
      if (item._id === id) {
        if (value < 1) {
          item.quantity = 1;
        } else if (value > item.number) {
          item.quantity = item.number;
        } else item.quantity = value;
      }
      setCart([...cart]);
      addToCart(cart);
    });
  };

  const removeProduct = (id) => {
    if (window.confirm("Siz bu mahsulotni rostdan ham ochirmoqchimisiz ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleProductComment = (e, item) => {
    if (comments.find((item1) => item1.id === item._id)) {
      let comments2 = comments;
      comments2.splice(
        comments2.findIndex((item2) => item2.id === item._id),
        1,
        {
          comment: e.target.value,
          id: item._id,
        }
      );
      setComments(comments);
    } else {
      setComments([...comments, { id: item._id, comment: e.target.value }]);
    }
  };
  console.log(comments);
  const tranSuccess = async () => {
    try {
      if (cart.length !== 0) {
        setLoader(true);
        let cart2 = cart;
        comments.forEach((item) => {
          cart2[cart2.findIndex((item2) => item2._id === item.id)].comment =
            item.comment;
        });
        await axios
          .post(
            "/api/payment",
            { cart2, comment },
            {
              headers: { Authorization: token },
            }
          )
          .then((res) => toast.success(res.data.msg), { autoClose: 1000 });
        setLoader(false);
        setCart([]);
        addToCart([]);
        setComment("");
      } else {
        toast.error("Mahsulot tanlanmagan", { autoClose: 1000 });
      }
    } catch (err) {
      toast.error(err.response.data.msg, { autoClose: 1000 });
    }
  };
  return (
    <div className="store-shop">
      <div className="store-shop-cart">
        <div className="title-header">
          <h3>Mahsulotlar savatchasi</h3>
          <h3>{cart.length} ta mahsulot</h3>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Mahsulotlar</th>
                <th>Miqdor</th>
                <th>Narx</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr className="shopcart-empty">
                  <td>
                    <img src="/images/undraw.svg" alt="sadfds" />
                  </td>
                </tr>
              ) : (
                cart.map((item, index) => (
                  <tr key={index} className="product-item">
                    <td className="product-item-first">
                      <div className="product-item-first-div">
                        <span className="product-item-first-div-span inner-span">
                          <img src={item.images.url} alt={item.title} />
                          <span>
                            <TextTruncate
                              line={8}
                              element="h5"
                              truncateText="…"
                              text={item.title}
                            />
                            <p
                              style={{
                                wordBreak: "break-word",
                                margin: "5px 0",
                                fontSize: "0.8rem",
                              }}
                            >
                              Kategoriya:{" "}
                              {
                                categories.filter(
                                  (item2) => item2._id === item.category
                                )[0].name
                              }
                            </p>
                            <button
                              className="btn-style"
                              onClick={() => {
                                removeProduct(item._id);
                              }}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                          </span>
                        </span>
                        <input
                          onChange={(e) => handleProductComment(e, item)}
                          type="text"
                          placeholder="mahsulot turi"
                          name="comment"
                        />
                      </div>
                    </td>
                    <td className="product-item-second">
                      <p className="d-block-p">
                        {item.quantity ? item.quantity : 0} / {item.number}
                      </p>
                      <span className="product-item-span">
                        <input
                          type="number"
                          style={{ color: "black", margin: "5.4px 0" }}
                          className="input-count"
                          onChange={(e) => getNumber(e, item._id)}
                          value={item.quantity}
                          min="1"
                          max={"" + item.number}
                        />
                      </span>
                    </td>
                    <td className="product-item-fourth">
                      <p>{item.price}s</p>
                      <hr />
                      <p>{item.quantity ? item.price * item.quantity : 0}s </p>
                    </td>
                    {/* <div className="type-input">
                      <input type="text" name="type"/>
                    </div> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="title-footer">
          <SimpleModal />
          <h3 className="btn-style">Umumiy hisob: {total} so'm</h3>
        </div>
      </div>
      <div className="store-shop-form">
        <FadeIn>
          <p>Xabar junatish!!</p>
        </FadeIn>
        <div id="form">
          <ScrollAnimation animateIn="fadeInUp">
            <TextareaAutosize
              className="message-text-form"
              rowsMin={3}
              rowsMax={14}
              resize="vertical"
              placeholder="Xabar yozish..."
              onChange={handleComment}
              value={comment}
              minLength="4"
              autosize={false}
            />
            <button
              className="btn-style"
              onClick={() => {
                tranSuccess();
                // loading();
              }}
              style={{ color: "rgba(0,0,0,0.5)" }}
            >
              {loader ? (
                <i className="fa fa-spin fa-spinner"></i>
              ) : (
                <i className="fa fa-send"></i>
              )}
              Buyurtmani jo'natish
            </button>
          </ScrollAnimation>
        </div>
        <div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ShopCart);
