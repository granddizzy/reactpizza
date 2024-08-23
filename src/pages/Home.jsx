import React, {useEffect} from "react";
import qs from 'qs';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import Categories from "../components/Categofies";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/skeleton";
import Pagination from "../components/Pagination";

import {setFilters} from '../redux/slicers/filterSlice';
import {fetchPizzas} from '../redux/slicers/pizzasSlice';

const Home = () => {
  const limitByPage = 8;
  //const [pizzas, setPizzas] = useState([]);
  const {pizzas, totalPages} = useSelector((state) => state.pizzas);
  const {category, currentPage, sort} = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({...params}));
    }
  }, []);

  useEffect(() => {
    const queryString = qs.stringify({category, currentPage, sort});
    navigate(`?${queryString}`);
  }, [category, currentPage, sort]);

  useEffect(() => {
    // setPizzas(res.data.data);
    const fetchData = async () => {
      try {
        await dispatch(fetchPizzas({category, sort, limit: limitByPage, currentPage}));
      } catch (error) {
        console.error('Error dispatching fetchPizzas:', error);
      }
    }

    fetchData();
  }, [category, sort, currentPage]);

  const skeletons = Array.from({length: limitByPage}, (_, index) => (
    <Skeleton key={index}/>
  ));

  return (
    <>
      <div className="content__top">
        <Categories/>
        <Sort/>
      </div>
      <h2 className="content__title">&nbsp;</h2>
      <div className="content__items">
        {pizzas.length > 0 ?
          pizzas.map((obj) => (
            <PizzaBlock key={obj.id}
                        id={obj.id}
                        title={obj.title}
                        price={obj.price}
                        imgUrl={obj.imageUrl}
                        sizes={obj.sizes}
                        types={obj.types}/>
          )) : skeletons
        }
      </div>
      <div>
        <Pagination/>
      </div>
    </>
  );
}

export default Home