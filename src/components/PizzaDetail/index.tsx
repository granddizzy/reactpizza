import React from "react";
import {addProduct, delProduct, Item} from "../../redux/slicers/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import styles from './pizzadetail.module.css';
import {RootState} from "../../redux/store";
import {Size} from "../../redux/slicers/pizzasSlice";

interface IndexProps {
  id: number;
  title: string;
  imgUrl: string;
  sizes: Size[];
  types: number[];
  description: string;
}

const Index: React.FC<IndexProps> = ({id, title, imgUrl, sizes, types, description}) => {
  // const {totalPrice, items} = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const typesNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState<number>(sizes[sizes.length - 1].size);
  const [activePrice, setActivePrice] = React.useState<number>(sizes[sizes.length - 1].price);
  const items = useSelector((state: RootState) => state.cart.items);

  const addPizzaInCart = (id: number, activeSize: number, activeType: number, price: number, imgUrl: string, title: string) => {
    dispatch(addProduct({id, size: activeSize, type: activeType, price, imgUrl, title, count: 1}));
  }

  const delPizzaInCart = (id: number, activeSize: number, activeType: number, price: number, imgUrl: string, title: string) => {
    dispatch(delProduct({id, size: activeSize, type: activeType, price, imgUrl, title, count: 1}));
  }

  const getPizzasInCart = (id: number) => {
    return items.reduce((count: number, item: Item) => {
      if (item.id === id) {
        return count + item.count;
      }
      return count;
    }, 0);
  }

  const changeSize = (el: Size) => {
    setActiveSize(el.size);
    setActivePrice(el.price)
  }

  return (
      <>
      <div className={styles.pizzaBlock}>
        <img
            className={styles.pizzaBlock__image}
            src={process.env.PUBLIC_URL + '/' + imgUrl}
            alt="Pizza"
        />
        <div className={styles.pizzaBlock__rightBlock}>
          <h4 className={styles.pizzaBlock__rightBlock__title}>{title}</h4>
          <h3 className={styles.pizzaBlock__rightBlock__deccription}>{description}</h3>
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
      </div>
  <div className="notfound__bottom-buttons">
    <a className="button button--outline button--add go-back-btn" href="/reactpizza"><span>Вернуться назад</span></a>
  </div>
</>
)
  ;
}

export default Index