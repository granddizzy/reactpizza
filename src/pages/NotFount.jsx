import React from "react";
import sadnessImg from '../assets/img/sadness.png';
import {Link} from "react-router-dom";

const NotFount = () => {
  return (
    <>
      <div className="notfound-content">
        <h1>404</h1>
        <img className="img404" src={sadnessImg}/>
      </div>
      <div className="notfound__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
}

export default NotFount;