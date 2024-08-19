import React, {useEffect, useState} from "react";
import axios from 'axios';
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import Categories from "../components/Categofies";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";

import {setFilters, setTotalPages} from '../redux/slicers/filterSlice';

const fetchPizzas = () => {

};

const Home = () => {
  const limit = 8;
  const [pizzas, setPizzas] = useState([]);

  const {totalPages, category, currentPage, sort} = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({...params, totalPages}));
    }
  }, []);

  useEffect(() => {
    const queryString = qs.stringify({totalPages, category, currentPage, sort});
    navigate(`?${queryString}`);
  }, [totalPages, category, currentPage, sort]);

  useEffect(() => {
    axios.get(`https://lepihov.by/api/pizzas?category=${category}&sort_by=${sort}&limit=${limit}&page=${currentPage}`)
      .then(res => {
        dispatch(setTotalPages(res.data.total));
        setPizzas(res.data.data);
      })
      .catch((error) => {
        console.error('Error fetching pizzas:', error);
      });
  }, [category, sort, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">&nbsp;</h2>
      <div className="content__items">
        {
          pizzas.map((obj) => (
            <PizzaBlock key={obj.id}
                        id={obj.id}
                        title={obj.title}
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