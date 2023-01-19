import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Cart } from '../pages/Cart';
import { Category } from '../pages/Category';
import { Checkout } from '../pages/Checkout';
import { Home } from '../pages/Home'
import { Search } from '../pages/Search';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { SingleProduct } from '../pages/SingleProduct';
import { PrivateRoute } from './PrivateRoute';

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:page" element={<Category />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/search/:query" element={<Search />} />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
