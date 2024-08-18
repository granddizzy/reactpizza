import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setCategory } from '../redux/slicers/categorySlice';

function Categories() {
  // const [activeIndex, setActiveIndex] = React.useState(0)

  const activeIndex = useSelector((state) => state.category.value)
  const dispatch = useDispatch();


  const onClickCategory = (index) => {
    //setActiveIndex(index);
    dispatch(setCategory(index));
  }

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li key={index} onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>{value}</li>
        ))}

      </ul>
    </div>
  );
}

export default Categories