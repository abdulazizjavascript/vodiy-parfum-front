import React, { useEffect, useContext, useState } from "react";
import { StoreContext } from "../Store/StoreG";
import { useHistory, NavLink, withRouter } from "react-router-dom";
import Slider from "react-slick";
import FadeIn from "react-fade-in";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from "axios";
import Loading from "./Loading";

const Category = () => {
  const [lastProducts, setLastProducts] = useState([]);
  const [loadingL, setLoadingL] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getLastProducts = async () => {
      const res = await axios.get("/api/lastProducts");
      setLastProducts(res.data);
      setLoadingL(false);
    };
    getLastProducts();
    document.title = "Parfume Center | Asosiy";
  }, []);

  useEffect(() => {
    const checking = localStorage.getItem("Login");
    if (!checking || checking !== "true") {
      history.push("/");
      history.go();
    }
  }, [history]);

  const settings = {
    autoplay: true,
    autoplaySpeed: 400,
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { categoriesAPI } = useContext(StoreContext);
  const [categories] = categoriesAPI.categories;
  const [loading] = categoriesAPI.loading;

  return (
    <div className="category">
      <div className="category-slick">
        <h2 className="category-title">
          <img src="/images/newproduct.png" alt="dfdff" />
          Yangi mahsulotlar
        </h2>
        {loadingL ? (
          <div
            style={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading loading={loadingL} />
          </div>
        ) : lastProducts.length !== 0 ? (
          <Slider {...settings} className="category-slick-slider">
            {lastProducts.map((slick, index) =>
              slick !== null ? (
                <div
                  key={index}
                  className={"category-slick-slider-item " + index}
                >
                  <div className="inner">
                    <img src={slick.images.url} alt={slick.title} />
                    <h4>{slick.title}</h4>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </Slider>
        ) : (
          ""
        )}
      </div>

      <div className="category-items">
        <h4>
          <i className="fa fa-shopping-basket fa-fw"></i> Mahsulotlar
          kategoriyasi
        </h4>
      </div>

      <ul className="category-wrapper border-box">
        {loading ? (
          <Loading loading={loading} />
        ) : categories.length !== 0 ? (
          categories.map((item, index) => (
            <li key={index}>
              <FadeIn>
                <div className="cat-box-wrapper">
                  <LazyLoadImage
                    effect="blur"
                    src={item.images.url}
                    alt={item.title}
                    width="100%"
                    height="200px"
                  />
                  <NavLink
                    to={"/category/" + item._id}
                    className="navlink-text"
                    // onClick={() => {
                    //   getDataProduct(item);
                    // }}
                  >
                    {item.name}
                  </NavLink>
                </div>
              </FadeIn>
            </li>
          ))
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default withRouter(Category);
