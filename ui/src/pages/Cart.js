import Cart from "../components/cart/Cart"
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {Dialog, DialogTitle, DialogActions, Button} from "@mui/material"
import { LoginContext } from "../contexts/LoginContext";
import { CartContext } from "../contexts/CartContext";

const CartPage = () => {
  const [open, setOpen] = useState(false)
  const loggedUserContext = useContext(LoginContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const handleOrder = (order) => {
    if (!loggedUserContext.uid) {
      setOpen(true)
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      };
      fetch('http://localhost:3001/addOrder', requestOptions)
        .then(response => {
          console.log(response);
          clearCart();
          navigate('/')
        }
        ).catch((error) => console.log(error))
    }
  }

  const handleClose = () => {
    navigate('/auth');
  }

  return (
    <div>
    <Cart handleOrder={handleOrder}></Cart>
    <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description" >
        <DialogTitle>{"You must log in to order products"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>go to login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartPage;
