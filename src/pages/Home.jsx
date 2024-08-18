import React, {useEffect, useState} from "react";

import Categories from "../components/Categofies";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import {useSelector} from "react-redux";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);

  const categoryState = useSelector((state) => state.category.value)
  const sortState = useSelector((state) => state.sort.value)

  useEffect(() => {
    fetch(`https://lepihov.by/api/pizzas?category=${categoryState}&sort_by=${sortState}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setPizzas(data))
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, [categoryState, sortState]);

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          pizzas.map((obj) => (
            <PizzaBlock key={obj.id} title={obj.title}
                        price={obj.price}
                        imgUrl={obj.imageUrl}
                        sizes={obj.sizes}
                        types={obj.types}/>
          ))
        }
      </div>
    </>
  );
}

export default Home