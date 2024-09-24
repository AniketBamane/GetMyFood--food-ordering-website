import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const adminStore = create(
  persist(
    (set) => ({
      loading: false,
      restaurants:[],
      restaurant:{},
      orders:[],
      createRestaurant:async(restaurantDetail)=>{
        try{
          set({loading:true})
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/createRestaurant`, restaurantDetail, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(response.data != null){
            set(state=>(
              {
                loading:false,
                restaurants: [...state.restaurants, response.data.restaurant],
              }
            ))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      updateRestaurant: async(restaurantDetail,id)=>{
        try{
          set({loading:true})
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/updateRestaurant/${id}`, restaurantDetail, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(response.data!= null){
            set(state=>({
              restaurants: state.restaurants.map(r=>r._id === restaurantDetail._id? response.data.restaurant : r),
              loading:false,
              restaurant:response.data.restaurant
            }))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      deleteRestaurant: async(restaurantID)=>{
        try{
          set({loading:true})
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/deleteRestaurant/${restaurantID}`, {
            withCredentials: true,
          });
          if(response.data!= null){
            set(state=>({
              restaurants: state.restaurants.filter(r=>r._id!== restaurantID),
              loading:false,
            }))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      getRestaurants: async()=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/getRestaurants`, {
            withCredentials: true,
          });
          if(response.data!= null){
            set({
              loading: false,
              restaurants: response.data.restaurants,
            })
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      getOrders: async()=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/getOrders`, {
            withCredentials: true,
          });
          if(response.data!= null){
            set({
              loading: false,
              orders: response.data.orders,
            })
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      updateOrder:async(orderId,formData)=>{
        try{
          set({loading:true})
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/order/updateOrder/${orderId}`, formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if(response.data!= null){
            set(state=>({
              orders: state.orders.map(o=>o._id === orderId? response.data.order : o),
              loading: false,
            }))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      createDish:async(dishDetails)=>{
        try{
          set({loading:true})
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/dish/createDish`, dishDetails, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if(response.data!= null){
            set(state=>(
              {
                loading: false,
                restaurants: state.restaurants.map(r=>r._id === response.data.dish.restaurant._id? {...r, dishes:[...r.dishes, response.data.dish]} : r),
                restaurant:{...state.restaurant,dishes:[...state.restaurant.dishes, response.data.dish]}
              }
            ))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      updateDish:async(dishDetails,id)=>{
        try{
          set({loading:true})
          const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/dish/updateDish/${id}`, dishDetails, {
            withCredentials: true,
            headers: {
              'Content-Type':'multipart/form-data',
            },
          });
          if(response.data!= null){
            set(state=>({
              restaurants: state.restaurants.map(r=>r._id === response.data.dish.restaurant._id? {...r, dishes:[...r.dishes.filter(d=>d._id!== response.data.dish._id), response.data.dish]} : r),
              loading: false,
              restaurant:{...state.restaurant,dishes:[...state.restaurant.dishes.filter(d=>d._id != id), response.data.dish]}
            }))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      deleteDish: async(dishId,restaurantId)=>{
        try{
          set({loading:true})
          const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/dish/deleteDish/${dishId}`, {
            withCredentials: true,
          });
          console.log(response)
          if(response.data!= null){
            set(state=>({
              restaurants: state.restaurants.map(r=>r._id === restaurantId? {...r, dishes:[...r.dishes.filter(d=>d._id!== dishId)]} : r),
              loading: false,
              restaurant:{...state.restaurant, dishes:state.restaurant.dishes.filter(d=>d._id!== dishId)}
            }))
            toast.success(response.data.message);
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      getRestaurantById: async(restaurantId)=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/getRestaurant/${restaurantId}`, {
            withCredentials: true,
          });
          if(response.data!= null){
            set({
              loading: false,
              restaurant: response.data.restaurant,
            })
          }
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      }
    }),
    { 
      name: "adminStore",
      storage:createJSONStorage(()=>localStorage) 

    } 
  )
)

export default adminStore;