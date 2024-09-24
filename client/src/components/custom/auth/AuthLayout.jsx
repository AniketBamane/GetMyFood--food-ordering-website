import authStore from '@/store/authStore'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthLayout = () => {
  const {isAuthenticated} = authStore()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  },[isAuthenticated])
  return (
    <Outlet />
  )
}

export default AuthLayout