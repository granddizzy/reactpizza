import React from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import config from "../config";
import PizzaDetail from "../components/PizzaDetail";
import Skeleton from "../components/PizzaDetail/skeleton";

const Pizza = () => {
  const params = useParams();
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const res = await axios.get(`${config.apiUrl}/pizza?id=${params.id}`);
        setPizza(res.data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchPizza();
  }, []);

  return (
    <>
      {pizza ?
        <PizzaDetail
          id={pizza.id}
          title={pizza.title}
          imgUrl={pizza.imageUrl}
          sizes={pizza.sizes}
          types={pizza.types}
          description={pizza.description}/> : <Skeleton/>
      }
    </>
  );

  // return (
  //   <>
  //     <Skeleton/>
  //   </>
  // );
}

export default Pizza;