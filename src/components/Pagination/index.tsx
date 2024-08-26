import React from "react";
import styles from './pagination.module.css';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from '../../redux/slicers/filterSlice';
import {RootState} from "../../redux/store";

function Index() {
    const {currentPage} = useSelector((state: RootState) => state.filter)
    const {totalPages} = useSelector((state: RootState) => state.pizzas)
    // const total = useSelector((state) => state.filter)
    const dispatch = useDispatch();
    const onPageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    return (
        <div className={styles.pagination}>
            <button
                onClick={() => onPageChange(currentPage - 1)}
        className={styles.button}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          className={styles.button}
          style={{
            backgroundColor: currentPage === index + 1 ? "#fe5f1e" : "#fff",
            color: currentPage === index + 1 ? "#fff" : "#fe5f1e",
          }}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={styles.button}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}

export default Index