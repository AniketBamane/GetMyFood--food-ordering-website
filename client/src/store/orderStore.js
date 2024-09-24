import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";
import authStore from "./authStore";

const orderStore = create(
  persist(
    (set) => ({
      orders: [],
      loading:false,
      createOrder:async()=>{
        try{
          set({loading:true})
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/createOrder`,{},{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log(response)
          if(response.data != null){
            toast.success('Order created successfully!')
            set(state=>(
              {orders: [...state.orders, response.data.order]}
            ))
            authStore.getState().setCart()
          }else{
            toast.error('Failed to create order!')
          }
        }catch(err){
          console.log(err)
          toast.error(err.response.data.message)
        }finally{
          set({loading:false})
        }
      },
      deleteOrder: async(orderId) => {
        try{
          console.log(orderId)
          set({loading:true})
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/order/deleterOrder/${orderId}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log(response ,"------------------------------")
          if(response.data != null){
            toast.success(response.data.message)
            set(state=>(
              {orders: state.orders.filter((order) => order._id!== orderId)}
            ))
          }
        }catch(err){
          console.log(err)
          toast.error(err.response.data.message)
        }finally{
          set({loading:false})
        }
      },
      getOrders:async()=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/getOrders`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          if(response.data!= null){
            set({orders: response.data.orders})
          }
        }catch(err){
          console.log(err)
          toast.error(err.response.data.message)
        }finally{
          set({loading:false})
        }
      }
    }),
  
  )
)

export default orderStore;