import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "./component/Auth";
import Category from "./component/Category";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import StoreG from "./Store/StoreG";
import Main from "./component/Main";
import About from "./component/About";
import Connect from "./component/Connect";
import ShopCart from "./component/ShopCart";
import NotFound from './component/NotFound'
import ProtectedRoute from "./component/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import History from "./component/History";
const App = () => {
  const isAuth = localStorage.getItem("Login");

  useEffect(() => {
    document.title = "Parfume Center";
  }, []);

  return (
    <>
      <StoreG>
        <Router>
          <ToastContainer />
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Auth />
            </Route>
            <ProtectedRoute path="/main" isAuth={isAuth}>
              <Category  />
            </ProtectedRoute>

            <ProtectedRoute
              path="/category/:id"
              component={Main}
              isAuth={isAuth}
            />

            <ProtectedRoute path="/store" isAuth={isAuth}>
              <ShopCart />
            </ProtectedRoute>

            <ProtectedRoute path="/about" isAuth={isAuth}>
              <About />
            </ProtectedRoute>

            <ProtectedRoute path="/connect" isAuth={isAuth}>
              <Connect />
            </ProtectedRoute>

            <ProtectedRoute path="/history" isAuth={isAuth}>
              <History/>
            </ProtectedRoute>

            <Route path="*">
              <NotFound/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </StoreG>
    </>
  );
};

export default App;
