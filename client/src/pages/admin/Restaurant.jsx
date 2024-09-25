import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import adminStore from "@/store/adminStore";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import CreateRestaurant from "@/components/custom/form/CreateRestaurant";
import Progressing from "@/components/custom/home/Progressing";


const Restaurant = () => {
  const navigate = useNavigate();
  const {restaurants,loading,getRestaurants} = adminStore()

  const getAdminRestaurants = async ()=>{
    try{
      await getRestaurants()
    }catch(err){
      toast.error(err.message)
    }
  }



  useEffect(()=>{
    getAdminRestaurants()
  },[])

  

  return (
  <div className="min-h-screen">
  {
    loading ?  
  <Progressing />
  :
  <>
  <div className="flex justify-between mt-2 items-center">
  <h2 className="text-3xl font-semibold">Our Restaurants</h2>
  <Dialog>
    <DialogTrigger>
    <Button>
    create Restaurant
  </Button>
    </DialogTrigger>
    <CreateRestaurant />
  </Dialog>
  </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  {restaurants.length == 0 &&
  (
  <p>No Restaurant Found !</p>
  )}
  {restaurants.map((restaurant) => (
    <Card key={restaurant._id} className="shadow-md hover:shadow-lg transition duration-300">
      <CardHeader>
        <img src={restaurant.poster} alt={restaurant.name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold">{restaurant.name}</h2>
        <p className="text-gray-600">{restaurant.location}</p>
        <div className="mt-2 space-x-2">
          {restaurant.tags.map((tag, index) => (
            <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
       <Button className="mt-4" onClick={() => navigate(`/auth/restaurant/${restaurant._id}`)}>
          View Details
        </Button>

      </CardContent>
    </Card>
  ))}
</div>
  </>
}
  </div>
  );
};

export default Restaurant;
