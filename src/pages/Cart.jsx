import React from "react";
import CartEmpty from "../components/Cart/CartEmpty";
import {useSelector} from "react-redux";
import CartFulled from '../components/Cart';

const Cart = () => {
  const totalCount = useSelector((state) => state.cart.totalCount);
  return (
    <div className="container--cart">
      <div className="cart">
        {totalCount > 0 ? (
            <CartFulled/>
        ) : (
          <CartEmpty/>
        )
        }
      </div>
    </div>
  );
}

export default Cart;