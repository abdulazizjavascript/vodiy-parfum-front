import React, { useEffect } from "react";
import { NavLink, withRouter, useHistory } from "react-router-dom";
import { Animated } from "react-animated-css";
const About = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = "Parfume Center | Biz haqimizda";
    const checking = localStorage.getItem("Login");
    if (!checking || checking !== "true") {
      history.push("/");
      history.go();
    }
  }, [history]);
  return (
    <div className="about">
      <div className="about-text">
        <Animated
          animationIn="fadeInRight"
          animationOut="fadeOut"
          isVisible={true}
        >
          <h3>Biz haqimizda</h3>
        </Animated>
        <Animated
          animationIn="fadeInUp"
          animationOut="fadeOut"
          isVisible={true}
        >
          <p>
        
          </p>
        </Animated>

        <NavLink to="/connect">
          <button className="btn-style">
            <i className="fa fa-phone"></i>
            {"  "}Aloqa
          </button>
        </NavLink>
      </div>

      <div className="about-image">
        <img src="./images/team_3.svg" alt="adsd" />
      </div>
    </div>
  );
};

export default withRouter(About);
