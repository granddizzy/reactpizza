import React from "react";
import {addProduct} from "../../redux/slicers/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import styles from './pizzadetail.module.css';

function Index({id, title, imgUrl, sizes, types}) {
  // const {totalPrice, items} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const typesNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(sizes[sizes.length - 1].size);
  const [activePrice, setActivePrice] = React.useState(sizes[sizes.length - 1].price);
  console.log(sizes)
  const {items} = useSelector((state) => state.cart);

  const addPizzaInCart = (id, activeSize, activeType, price, imgUrl, title) => {
    dispatch(addProduct({id, size: activeSize, type: activeType, price, imgUrl, title}));
  }

  const getPizzasInCart = (id) => {
    return items.reduce((count, item) => {
      if (item.id === id) {
        return count + item.count;
      }
      return count;
    }, 0);
  }

  const changeSize = (el) => {
    setActiveSize(el.size);
    setActivePrice(el.price)
  }

  return (
    <div className={styles.pizzaBlock}>
      <img
        className={styles.pizzaBlock__image}
        src={process.env.PUBLIC_URL + '/' + imgUrl}
        alt="Pizza"
      />
      <div className={styles.pizzaBlock__rightBlock}>
        <h4 className={styles.pizzaBlock__rightBlock__title}>{title}</h4>
        <div className={styles.pizzaBlock__rightBlock__selector}>
          <ul>
            {
              types.map((typeIndex, index) => (
                <li key={index} className={activeType === typeIndex ? styles.active : ''}
                    onClick={() => setActiveType(typeIndex)}>{typesNames[typeIndex]}</li>
              ))
            }
          </ul>
          <ul>
            {
              sizes.map((el, index) => (
                <li key={index} className={activeSize === el.size ? styles.active : ''}
                    onClick={() => changeSize(el)}>{el.size} см.</li>
              ))
            }
          </ul>
        </div>
        <div className={styles.pizzaBlock__bottom}>
          <div className={styles.pizzaBlock__price}>{activePrice}</div>
          <button
            onClick={() => addPizzaInCart(id, activeSize, activeType, activePrice, imgUrl, title)}
            // className="button button--outline button--add">
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
            <i>{getPizzasInCart(id)}</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index