import React from "react";
import {RootState} from "../../redux/store";

import {addProduct, delProduct} from '../../redux/slicers/cartSlice';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Size} from "../../redux/slicers/pizzasSlice";

interface IndexProps {
  id: number;
  title: string;
  imgUrl: string;
  sizes: Size[];
  types: number[];
}

function Index({id, title, imgUrl, sizes, types}: IndexProps) {
  const typesNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(sizes[sizes.length - 1].size);
  const [activePrice, setActivePrice] = React.useState(sizes[sizes.length - 1].price);

  const {items} = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const addPizzaInCart = (id: number, activeSize: number, activeType: number, price: number, imgUrl: string, title: string) => {
    dispatch(addProduct({id, size: activeSize, type: activeType, price, imgUrl, title, count: 1}));
  }

  const delPizzaInCart = (id: number, activeSize: number, activeType: number, price: number, imgUrl: string, title: string) => {
    dispatch(delProduct({id, size: activeSize, type: activeType, price, imgUrl, title, count: 1}));
  }

  const changeSize = (el: Size) => {
    setActiveSize(el.size);
    setActivePrice(el.price)
  }

  const getPizzasInCart = (id: number) => {
    return items.reduce((count, item) => {
      if (item.id === id) {
        return count + item.count;
      }
      return count;
    }, 0);
  }

  return (
    <div className="pizza-block">
      <Link to={`pizza/${id}`}>
        <img
          className="pizza-block__image"
          src={process.env.PUBLIC_URL + '/' + imgUrl}
          alt="Pizza"
        />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {
            types.map((typeIndex: number, index: number) => (
                <li key={index} className={activeType === typeIndex ? 'active' : ''}
                    onClick={() => setActiveType(typeIndex)}>{typesNames[typeIndex]}</li>
            ))
          }
        </ul>
        <ul>
          {
            sizes.map((el, index: number) => (
                <li key={index} className={activeSize === el.size ? 'active' : ''}
                    onClick={() => changeSize(el)}>{el.size} см.</li>
            ))
          }
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{activePrice}</div>
        <button onClick={() => delPizzaInCart(id, activeSize, activeType, activePrice, imgUrl, title)}
                className="button button--outline button--add">
          <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M1.2 6C1.2 5.3373 1.7373 4.8 2.4 4.8H9.6C10.2627 4.8 10.8 5.3373 10.8 6C10.8 6.6627 10.2627 7.2 9.6 7.2H2.4C1.7373 7.2 1.2 6.6627 1.2 6Z"
                fill="white"
            />
          </svg>
          {/*<span>Добавить</span>*/}
        </button>
        <div className="pizza-block__count">{getPizzasInCart(id)}</div>
        <button onClick={() => addPizzaInCart(id, activeSize, activeType, activePrice, imgUrl, title)}
                className="button button--outline button--add">
          <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
            />
          </svg>
          {/*<span>Добавить</span>*/}
        </button>
      </div>
    </div>
  );
}

export default Index