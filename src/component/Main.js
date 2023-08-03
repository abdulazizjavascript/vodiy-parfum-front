import React, { useState, useEffect, useContext } from "react";
import TextTruncate from "react-text-truncate";
import FadeIn from "react-fade-in";
import { Redirect, withRouter } from "react-router-dom";
import { StoreContext } from "../Store/StoreG";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import Loading from "./Loading";
import Select from "react-select";

function Main(props) {
  const state = useContext(StoreContext);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        `/api/products?limit=${100}&category=${
          props.match.params.id
        }&${sort}&title[regex]=${search}`
      );
      setProducts(res.data.products);
      setLoading(false);
    };
    getProducts();
  }, [sort, search, props]);

  useEffect(() => {
    document.title = "Parfume Center | Mahsulotlar";
    const checking = localStorage.getItem("Login");
    if (checking || checking !== "true") {
      return <Redirect to="/" />;
    }
  }, []);

  ///SEARCH FILTER
  const inputChange = (e) => {
    setSearch(e);
  };
  const addCart = state.userAPI.addCart;
  const [cart] = state.userAPI.cart;
  const [cart2, setCart2] = useState(cart);
  useEffect(() => {
    setCart2(cart);
  }, [cart]);
  // console.log(cart);
  // const [call, setCall] = useState(false);
  // useEffect(() => {
  //   setCall(!call);
  // }, [cart]);
  return (
    <div className="main border-box">
      <div className="search">
        <span>
          <div className="search-icon">
            <i className="fa fa-search"></i>
          </div>
          <input
            type="search"
            className="searchInput"
            value={search}
            placeholder="Qidirish..."
            onChange={(e) => inputChange(e.target.value)}
          />
        </span>

        <span>
          <h4>Saralash</h4>
          <Select
            onChange={(e) => setSort(e.value)}
            styles={customStyles}
            isSearchable={false}
            name="color"
            defaultValue={sortData[0]}
            options={sortData}
          />
        </span>
      </div>

      <div className="main-items">
        <ul>
          {loading ? (
            <Loading loading={loading} />
          ) : (
            products.map((product) => (
              <li key={product._id}>
                <FadeIn>
                  <div className="main-items-box">
                    <span className="main-items-box-img">
                      <LazyLoadImage
                        src={product.images.url}
                        alt={product.name}
                        width="100%"
                        height="200px"
                        effect="blur"
                      />
                    </span>
                    <span className="main-items-box-text">
                      <h5>{product.title}</h5>
                      <TextTruncate
                        line={1}
                        element="h5"
                        truncateText="…"
                        text={product.description}
                      />
                      <span className="cost-btn">
                        <h6>Miqdor: {product.number}</h6>
                        <h6>Narx: {product.price}som</h6>

                        <button
                          className="btn-style"
                          onClick={() => addCart(product)}
                          style={
                            cart2.filter((item) => item._id === product._id)
                              .length !== 0
                              ? { backgroundColor: "#90ee90" }
                              : { backgroundColor: "transparent" }
                          }
                          disabled={product.number === 0 ? true : false}
                        >
                          {cart2.filter((item) => item._id === product._id)
                            .length !== 0
                            ? "Qo'shildi"
                            : "Qo'shish"}
                        </button>
                      </span>
                    </span>
                  </div>
                </FadeIn>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default withRouter(Main);

const sortData = [
  {
    label: "Yangilari",
    value: "",
    color: "white !important",
    backgroundColor: "#5599AF !important",
  },
  {
    label: "Eskilari",
    value: "sort=oldest",
    color: "white !important",
    backgroundColor: "#5599AF !important",
  },
  {
    label: "Eng eng sotilganlari",
    value: "sort=-sold",
    color: "white !important",
    backgroundColor: "#5599AF !important",
  },
  {
    label: "Narx: Kamayish",
    value: "sort=-price",
    color: "white !important",
    backgroundColor: "#5599AF !important",
  },
  {
    label: "Narx: o'sish",
    value: "sort=price",
    color: "white !important",
    backgroundColor: "#5599AF !important",
  },
];

const customStyles = {
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    // const color = chroma(data.color);
    console.log({ data, isDisabled, isFocused, isSelected });
    return {
      ...styles,
      backgroundColor: isFocused ? "#blue !important" : null,
      color: "white !important",
    };
  },
  menu: (provided, state) => ({
    ...provided,
    color: "white",
    background: "#5599AF",
  }),
};
