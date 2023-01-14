import Cart from "../components/cart/Cart"
import {useNavigate } from "react-router-dom";


const CartPage = () => {
  const navigate = useNavigate();
  const handleOrder = (order) => { 
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    };
    fetch('http://localhost:3001/addOrder', requestOptions)
      .then(response => {
        console.log(response);
        navigate('/')
      }
      ).catch((error) => console.log(error))
  }
  return (
    <Cart handleOrder={handleOrder}></Cart>
  );
};

export default CartPage;
