import authStore from '@/store/authStore'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Layout from '../Layout'


const AdminLayout = () => {
  const navigate = useNavigate()
  const {user} = authStore()
  useEffect(()=>{
    if(!user?.isAdmin){
      navigate("/")
    }
  },[navigate,user])
  return (
    <Layout>
    <Outlet />
    </Layout>
  )
}

export default AdminLayout

