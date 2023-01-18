import { createContext, useState } from "react";
import React from "react";


const CartContext = React.createContext(
    {
        cart: [],
        removeFromCart: (productId) => {},
        addToCart : (product) => {},
        clearCart: () => {}
    }
) 

const CartContextProvider = (props) => {
    const [cart, setCart] = useState([]);

    const addToCartHandler = (product) => {
        const newCart = cart?.length ? upsertProduct(product) : [product]
        setCart(newCart)
    }

    const handleClearCart = () => {
        setCart([]);
    }

    const upsertProduct= (product) => {
        const newCart = cart;
        const i = newCart.findIndex((element) => element.id === product.id);
        if (i > -1) newCart[i] = product; // (2)
        else newCart.push(product);
        return newCart;
    }

    const removeFromCartHandler = (productId) => {
        const newCart = cart.filter((product) => product.id !== productId);
        setCart(newCart)
    }

    const contextValue = {
        cart: cart,
        removeFromCart: removeFromCartHandler,
        addToCart: addToCartHandler,
        clearCart: handleClearCart
    }

    return <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
}
  
  
  export { CartContextProvider, CartContext};