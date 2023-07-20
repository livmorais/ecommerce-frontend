import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/login/Login';
import CheckoutForm from './components/checkout/CheckoutForm';
import Checkout from './components/checkout/Checkout';
import Sales from './components/sales/Sales';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import ApiProducts from './components/products/api/ApiProducts';
import Register from './components/register/Register';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Products token={token || ""} />}></Route>
        <Route path="/api/products" element={<ApiProducts />} />
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/checkout/success" element={<Checkout />} /> 
        <Route path='/api/sales' element={<Sales />}></Route>
        <Route path='/auth/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
    )
  }

export default App
