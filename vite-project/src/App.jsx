import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Order from "./pages/order/Order";
import NoPage from "./pages/nopage/NoPage";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState  from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/pages/AddProduct";
import UpdateProduct from "./pages/admin/pages/UpdateProduct";

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/productinfo/:id" element={<ProductInfo/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
          <Route path="/updateproduct" element={<UpdateProduct/>} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </Router>
    </MyState>
  );
};

export default App;
