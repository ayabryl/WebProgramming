import Cart from "../components/cart/Cart"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material"
import { LoginContext } from "../contexts/LoginContext";
import { CartContext } from "../contexts/CartContext";

const CartPage = () => {
  const [city, setCity] = useState("");
  const [CommentForDelivery, setCommentForDelivery] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false)
  const [userDetailsOpen, setUserDetailsOpen] = useState(false)
  const loggedUserContext = useContext(LoginContext);
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchUserDetails = () => {
    const url = "http://localhost:3001/users/" + loggedUserContext.uid;
    console.log(url);

    fetch(url)
      .then((res) => {
        res.json().then((data) => {
          setAddressLine(data.address_line);
          setCity(data.city);
          setPhone(data.phone_number);
          setName(data.name);
          setCommentForDelivery(data.comment);
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Fetching user data...");
    fetchUserDetails();
  }, []);
  const handleOrder = (order) => {
    if (!loggedUserContext.uid) {
      setOpen(true)
    } else if (!addressLine || !name || !phone || !CommentForDelivery || !city) {
      setUserDetailsOpen(true)
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

  const handleGoToUserDetails = () => {
    navigate('/profile')
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
        <Dialog
        open={userDetailsOpen}
        keepMounted
        onClose={handleGoToUserDetails}
        aria-describedby="alert-dialog-slide-description" >
        <DialogTitle>{"You must fill in your details to order products"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleGoToUserDetails}>go to user profile</Button>
        </DialogActions>
      </Dialog>
      </Dialog>
    </div>
  );
};

export default CartPage;
