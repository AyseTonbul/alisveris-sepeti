import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import { data } from "./Data";


export const BooksContext = createContext();

export default function App() {
  const [state, setState] = useState({
    bookList: data,
    cart: [],
  });

  const addToCart = book => setState({
      ...state,
      cart: state.cart.find((cartItem) => cartItem.id === book.id)
        ? state.cart.map((cartItem) =>cartItem.id === book.id ? { ...cartItem, count: 
          cartItem.count + 1 }: cartItem)
        : [...state.cart, { ...book, count: 1 }],
    });

  const increase = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      ),
    });
  };

  const decrease = (id) => {
    setState({
      ...state,
      cart: state.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      ),
    });
  };

  const removeFromCart = id =>
    setState({
      ...setState,
      cart: state.cart.filter(cartItem => cartItem.id !== id),
    });

  return (
    <BrowserRouter>
      <BooksContext.Provider
        value={{ state: state, addToCart, increase, decrease, removeFromCart }}
      >
        <div className='App'>
          <h1>
            <img src='https://i.hizliresim.com/eympt2j.' alt='Kitap Listesi' />
            Yazılım Kitapları
          </h1>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/cart' element={<Cart />} />
          </Routes>
        </div>
      </BooksContext.Provider>
    </BrowserRouter>
  );
}