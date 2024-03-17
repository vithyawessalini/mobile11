import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Thanks from "./pages/feedback/Try"
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private"
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from "./pages/Admin/Users";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";

import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders"
import Feedback from "./pages/Auth/Feedback";
import Review from "./pages/Admin/Review";
import Form from "./pages/Form";
import AdminSignup from "./pages/Admin/AdminSignup";
import AdminLogin from "./pages/Admin/AdminLogin";
import Forget from "./pages/Admin/Forget";
import Exchange from "./pages/Exchange"
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<About />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/form" element={<Form />} />


      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/feedback" element={<Feedback/>}/>
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />
      <Route path="/exchange" element={<Exchange />} />

        <Route path="user" element={<Dashboard/>}/>
        <Route path="user/profile" element={<Profile/>}/>
        <Route path="user/orders" element={<Orders/>}/>
        <Route path="/loginAdmin" element={<AdminLogin/>}/>
        <Route path="/signupAdmin" element={<AdminSignup/>}/>
       <Route path="/dashboard" element={<AdminRoute/>}/>
        <Route path="admin" element={<AdminDashboard/>}/>
        <Route path="admin/create-category" element={<CreateCategory/>}/>
        <Route path="adminforgot-password" element={<Forget/>}/>
        <Route path="admin/products" element={<Products/>}/>
        <Route 
          path="admin/product/:id" 
          element={<UpdateProduct/>}/>
        <Route path="admin/create-product" element={<CreateProduct/>}/>
        <Route path="admin/users" element={<Users/>}/>
        <Route path="admin/review" element={<Review/>}/>
        <Route path="admin/orders" element={<AdminOrders/>}/>
      
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPasssword/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<Pagenotfound />} />
      <Route path="/thanks" element={<Thanks/>} />
      </Routes>
      
    </>
  );
}

export default App;