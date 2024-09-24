import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner";

const authStore = create(
  persist(
    (set) => ({
      loading: false,
      isAuthenticated: false,
      user: null,
      verification: {
        verificationCode:null,
        email:null,
      },
      setCart:()=>{
        set(state=>(
          {
            user: {...state.user, cart: {dishes:[],totalPrice:0} },
          }
        ))
      }
      ,
      cleanVerification :()=>{
        set({verification:{
          verificationCode:null,
          email:null,
        }})
      },

      getCurrentUser:async()=>{
        try{
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/getCurrentUser`,
            { withCredentials: true }
          );
          if (response.data!= null) {
            console.log(response.data.user , "in current user")
            set({
              isAuthenticated: true,
              user:response.data.user,
              loading: false,
            });
          }
        }catch(err){
          console.log(err)
          toast.error(err.message)
        }
      },
      // Login function
      login: async (formData) => {
        set({ loading: true });
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
            formData,
            { 
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
             }
          );
          if (response.data != null) {
            set({
              isAuthenticated: true,
              user: {...response.data.user},
              loading: false,
            });
            toast.success("User Logged in successfully!");
          }
        } catch(error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },

      // Logout function
      logout: async () => {
        set({ loading: true });
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`,
            { withCredentials: true }
          );
          console.log(response)
          if (response.data != null) {
            set({
              isAuthenticated: false,
              user: null,
              loading: false,
            });
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },

      // Signup function
      signup: async (formData) => {
        set({ loading: true });
        console.log(formData)
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
            formData,
            { 
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
             }
          );
          if (response.data != null) {
            set({
              isAuthenticated: true,
              user: response.data.user,
              loading: false,
              verification:{
                verificationCode: null,
                email: null,
              }
            });
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },

      // Verify email function
      verifyEmail: async (email) => {
        set({ loading: true });
        try {
          console.log("in verify email ....")
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-email`,
            { email },
            { withCredentials: true }
          );
          console.log(response)
          if (response.data != null) {
            
            set({
              verification: {
                verificationCode : response.data.verificationCode.toString(),
                email : email,
              },
              loading: false,
            });
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },
      updateProfile:async(formData)=>{
        set({ loading: true });
        try {
          console.log(formData," in update profile store")
          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/auth/update-profile`,
            formData,
            { 
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
             }
          );
          if (response.data!= null) {
            set({
              user: response.data.user,
              loading: false,
            });
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      }
      // in user there will be field like cart and in that cart the object will look like 
      // {
      //   totalPrice: 67.94,
      //   items: [
      //     {
      //       dish: {
      //         name: 'Margherita Pizza',
      //         description: 'Classic cheese pizza with tomato sauce and basil.',
      //         price: 12.99,
      //         imageUrl: 'https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format',
      //       },
      //       quantity: 2,
      //     },
      //     {
      //       dish: {
      //         name: 'Caesar Salad',
      //         description: 'Fresh salad with Caesar dressing and croutons.',
      //         price: 8.99,
      //         imageUrl: 'https://www.recipetineats.com/tachyon/2016/05/Caesar-Salad_7-SQ.jpg',
      //       },
      //       quantity: 1,
      //     },
      //     {
      //       dish: {
      //         name: 'Spaghetti Carbonara',
      //         description: 'Pasta with creamy sauce, pancetta, and Parmesan.',
      //         price: 15.99,
      //         imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&resize=440,400',
      //       },
      //       quantity: 1,
      //     },
      //   ],
      // }
      //now make cart operations 
      ,
      addItemIntoCart: async(dishDetails)=>{
        set({ loading: true });
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/cart/addItemIntoCart`,
            {dishId:dishDetails._id},
            { withCredentials: true }
          );
          console.log(response," in add item into cart  !--------------------------------")
          if (response.data != null) {
            console.log(response.data.cart)
            set(state=>({
              user: {...state.user, cart: response.data.cart },
              loading: false,
            }));
            toast.success(response.data.message);
          }
        } catch (error) {
          console.log(error)
          toast.error(error.response.data.message);
        } finally {
          set({ loading: false });
        }
      },
    removeItemFromCart:async(dishDetails)=>{
      try{
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/removeItemFromCart`,
          {dishID:dishDetails._id},
          { withCredentials: true }
        );
        if (response.data!= null) {
          set(state=>(
            {
              user: {...state.user, cart: response.data.cart },
              loading: false,
            }
          ));
          toast.success(response.data.message);
        }
      }catch(err){
        toast.error(err.response.data.message);
      }finally{
        set({ loading: false });
      }
    },
    increaseQuantityOfItemInCart:async(dishDetails,quantity)=>{
      try{
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/increaseQuantity`,
          {dishID:dishDetails._id,
            quantity
          },
          { withCredentials: true }
        );
        if (response.data!= null) {
          set(state=>(
            {
              user: {...state.user, cart: response.data.cart },
              loading: false,
            }
          ));
          toast.success(response.data.message);
        }
      }catch(err){
        toast.error(err.response.data.message);
      }finally{
        set({ loading: false });
      }
    },
    removeQuantityOfItemCart:async(dishDetails,quantity)=>{
      try{
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/decreaseQuantity`,
          {dishID:dishDetails._id,
            quantity
          },
          { withCredentials: true }
        );
        if (response.data!= null) {
          set(state=>(
            {
              user: {...state.user, cart: response.data.cart },
              loading: false,
            }
          ));
          toast.success(response.data.message);
        }
      }catch(err){
        toast.error(err.response.data.message);
      }finally{
        set({ loading: false });
      }
    },
    deleteCart:async()=>{
      try{
        const response = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/cart/deleteCart`,
          { withCredentials: true }
        );
        if (response.data!= null) {
          toast.success(response.data.message);
        }
      }catch(err){
        toast.error(err.response.data.message);
      }finally{
        set({ loading: false });
      }
    }
    }),
    {
      name: "auth-storage", 
      storage:createJSONStorage( () => localStorage), 
    }    
  )
);

export default authStore;
