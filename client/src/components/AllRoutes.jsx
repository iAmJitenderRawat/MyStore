import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Category } from '../pages/Category';
import { Home } from '../pages/Home'
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:type" element={<Category />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/products/:id" element={<SingleProduct />} />
    </Routes>
  );
}
