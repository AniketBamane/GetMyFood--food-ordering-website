
import './App.css'
import Verification from './pages/auth/Verification'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import AboutUs from './pages/about/AboutUs'
import ContactUs from './pages/contact/ContactUs'
import Layout from './components/custom/Layout'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import AuthLayout from './components/custom/auth/AuthLayout'
import AdminLayout from './components/custom/auth/AdminLayout'
import Restaurant from './pages/admin/Restaurant'
import RestaurantDetail from './pages/admin/RestaurantDetail'
import AdminOrder from './pages/admin/AdminOrder'
import authStore from './store/authStore'
import { useEffect, useState } from 'react'
import SearchPage from './pages/search/SearchPage'
import GetRestaurantDetail from './pages/restaurant/GetRestaurantDetail'
import orderStore from './store/orderStore'
import LoadingPage from './components/custom/Loading'

function App() {
   const {getCurrentUser,user} = authStore()
   const [loading,setLoading] = useState(false)
   const [error,setError] =  useState("")
   const fetchEverything = async ()=>{
    setLoading(true)
    try{
      user && await getCurrentUser()

     }catch(err){
      setError(err.message)
     }finally{
      setLoading(false)
     }
   }
   useEffect(()=>{
    fetchEverything()
   },[])

   if(loading) {
    return <LoadingPage />
   }
  return (
    <Routes>
      <Route element={<AuthLayout />}>
      <Route path="/verification" element={<Verification />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<Layout></Layout>}>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path='/orders' element={<Order />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/restaurants/:rid' element={<GetRestaurantDetail />} />
      </Route>
      <Route path='/auth/'  element={<AdminLayout />}>
        <Route path='get-restaurants' element={<Restaurant />} />
        <Route path='restaurant/:id' element={<RestaurantDetail />} />
        <Route path="orders" element={<AdminOrder />} />
       </Route>
      <Route path="*" element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App
