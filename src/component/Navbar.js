import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { Sling as Hamburger } from "hamburger-react";
import { Link, NavLink } from "react-router-dom";
import { StoreContext } from "../Store/StoreG";
import Badge from "@material-ui/core/Badge";
import SimpleModal from "./ModalExit";
function Navbar() {
  const location = useLocation();

  const state = useContext(StoreContext);
  const [cart] = state.userAPI.cart;

  const [check, setCheck] = useState(true);
  const notFound = state.navFooter;

  return (
    <React.Fragment>
      {location.pathname === "/" || notFound ? null : (
        <div>
          <div className="navbar border-box">
            <div className="navbar-part">
              <span
                className={
                  check
                    ? "navbar-part-info checkNavbarFalse"
                    : "navbar-part-info checkNavbarTrue"
                }
              >
                <span className="nav-br-btn">
                  <a href="/main" className="nav-br-btn-link">
                    Vodiy Parfum
                  </a>
                  <button
                    className="nav-btn"
                    onClick={() => {
                      setCheck(!check);
                    }}
                  >
                    <Hamburger toggled={!check} toggle={setCheck} />
                  </button>
                </span>

                <ul className="nav-list">
                  <li onClick={() => setCheck(true)}>
                    <NavLink to="/main">Asosiy</NavLink>
                  </li>
                  <li onClick={() => setCheck(true)}>
                    <NavLink to="/about">Biz haqimizda</NavLink>
                  </li>
                  <li onClick={() => setCheck(true)}>
                    <NavLink to="/connect">Aloqa</NavLink>
                  </li>
                  <li onClick={() => setCheck(true)}>
                    <NavLink to="/history">Buyurtmalar tarixi</NavLink>
                  </li>
                  <li>
                    <SimpleModal />
                  </li>
                </ul>
              </span>
              <span className="navbar-part-shop">
                <Link to="/store">
                  <IconButton
                    style={{ color: "#c19ae7" }}
                    aria-label="add to shopping cart"
                  >
                    <Badge badgeContent={cart.length} color="secondary">
                      <img src="/images/groc.png" alt="asd" />
                    </Badge>
                  </IconButton>
                </Link>
              </span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
export default Navbar;
