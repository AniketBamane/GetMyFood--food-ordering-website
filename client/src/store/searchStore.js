import axios from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const searchStore = create(
  persist(
    (set) => ({
      searchText: "",
      results:[],
      restaurant:{},
      loading:false,
      searchByLocation:async(location)=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/getRestaurantsByLocation?q=${location}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          set({
            loading: false,
            results: response.data.restaurants,
          })
        }catch(err){
          toast.error(err.response.data.message);
        }finally{
          set({loading:false})
        }
      },
      getRestaurant:async(id)=>{
        try{
          set({loading:true})
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/getRestaurant/${id}`,{
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          })
          console.log(response)
          if(response.data != null){
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
      name: "search-store",
      storage: createJSONStorage(()=>localStorage),
    }
  )
)

export default searchStore;