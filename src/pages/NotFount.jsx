import React from "react";
import sadnessImg from '../assets/img/sadness.webp';
import {Link} from "react-router-dom";

const NotFount = () => {
  return (
    <>
      <img className="img404" src={sadnessImg}/>
      <div className="notfound__bottom-buttons">
        <a href="/" className="button button--outline button--add go-back-btn">
          <Link to="/"><span>Вернуться назад</span></Link>
        </a>
      </div>
    </>
  );
}

export default NotFount;