import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setCategory } from '../redux/slicers/filterSlice';
import {RootState} from "../redux/store";

function Categories() {
  // const [activeIndex, setActiveIndex] = React.useState(0)

  const activeIndex = useSelector((state: RootState) => state.filter.category)
  const dispatch = useDispatch();

  const onClickCategory = (index: number) => {
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