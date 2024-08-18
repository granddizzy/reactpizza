import React, {useEffect, useState} from "react";
import axios from 'axios';

import Categories from "../components/Categofies";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {setTotal} from '../redux/slicers/paginationSlice';

import {useDispatch, useSelector} from "react-redux";

const Home = () => {
  const limit = 8;
  const [pizzas, setPizzas] = useState([]);

  const category = useSelector((state) => state.category.value)
  const sort = useSelector((state) => state.sort.value)
  const page = useSelector((state) => state.pagination.page)
  const total = useSelector((state) => state.pagination.total)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://lepihov.by/api/pizzas?category=${category}&sort_by=${sort}&limit=${limit}&page=${page}`)
      .then(res => {
        dispatch(setTotal(res.data.total));
        setPizzas(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, [category, sort, page]);

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
      <div>
        <Pagination/>
      </div>
    </>
  );
}

export default Home