import React, { useContext, useEffect, useState } from "react";
import "./OrderCards.css";
import { tasks } from "../../utils/tasks";
import { frelance } from "../../utils/frelance";
import { order } from "../../utils/order";
import OrderCard from "../OrderCard/OrderCard"
import { Context } from "../../context/context";

const OrderCards = ({ operationMode }) => {

  const { currentUser, authenticated } = useContext(Context);
  const [area2, setArea2] = useState(false);
  const { handleOrderFilter } = useContext(Context);
 // const area2 = currentUser.role === 'Фрилансер' && authenticated ? order : frelance;

  useEffect((() => {
    if (currentUser.role === 'Фрилансер' && !operationMode) {
      handleOrderFilter(true);
      console.log('тут');
    } else {
      handleOrderFilter(false)
    }
    if (currentUser.role === 'Фрилансер' && authenticated ) return setArea2(true)
    setArea2(false)
  }), [currentUser, authenticated, operationMode])

  return (
    <div className="orderCards">
      {operationMode ? <OrderCard   cards={tasks} orderArea={true}/> : <OrderCard   cards={area2 ? order : frelance} /> }
    </div>
  );
};

export default OrderCards;
