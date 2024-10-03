import React, { useEffect, useState } from 'react'
import Navbar from './home/Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import authStore from '@/store/authStore'
import LoadingPage from './Loading'
import orderStore from '@/store/orderStore'

const Layout = () => {
  const {getOrders} = orderStore()
  const {getCurrentUser,isAuthenticated,user} = authStore()
  const [loading,setLoading] = useState(false)
  const [error,setError] =  useState("")
  const navigate = useNavigate()
  const fetchEverything = async ()=>{
   setLoading(true)
   try{
    await Promise.all([getCurrentUser(), getOrders()]);
    }catch(err){
     setError(err.message)
    }finally{
     setLoading(false)
    }
  }

  useEffect(()=>{
    if(!isAuthenticated){
      navigate("/login")
    }else{
      if(user.isAdmin){
        navigate("/auth/orders")
      }else{
       fetchEverything()
      }
    }
  },[isAuthenticated])
  if(loading){
    return <LoadingPage />
  }
  if(error){
    return <div>{error}</div>
  }
  return (
    <div className='mx-auto w-[90vw]'>
      <Navbar />
      <Outlet />
      <Footer />
      </div>
  )
}

export default Layout