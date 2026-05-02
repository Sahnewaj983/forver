import React from 'react'
import {Routes, Route, useLocation} from "react-router-dom"
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer, toast } from 'react-toastify';
import Verify from './pages/Verify'

const App = () => {

  const location = useLocation();

  // routes where you DON'T want header/footer
  const noLayoutRoutes = ["/login", "/forgot-password", "/reset-password"];

  const hideLayout = noLayoutRoutes.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
      <ToastContainer />
      {!hideLayout && <Navbar />}
      {!hideLayout && <SearchBar />}
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/place-order" element={<PlaceOrder/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/verify" element={<Verify/>} />
      </Routes>
      {!hideLayout && <Footer />}
    </div>
  )
}

export default App