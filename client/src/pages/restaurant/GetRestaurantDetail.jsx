import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import searchStore from "@/store/searchStore";
import { toast } from "sonner";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import authStore from "@/store/authStore";

const GetRestaurantDetail = () => {
  const params = useParams()
  const {restaurant,loading,getRestaurant} = searchStore()
  const{addItemIntoCart,loading:authLoading} = authStore()
  const navigate = useNavigate()

  const handleAddToCart = async(dishDetails)=>{
    console.log("in fetch restaurant --------------------------------")
    const toastId = toast.loading("please wait , add dish into cart ....")
    try {
      await addItemIntoCart(dishDetails);
    } catch (error) {
      toast.error(error.message,{
        id: toastId,
      });
    } finally {
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
    }
  }

  const fetchRestaurant = async () => {
    console.log("in fetch restaurant --------------------------------")
    const toastId = toast.loading("please wait , fetching restaurant ....")
    try {
      console.log(params)
      await getRestaurant(params.rid);
    } catch (error) {
      toast.error(error.message,{
        id: toastId,
      });
    } finally {
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
    }
  };

 useEffect(()=>{
   console.log("in useEFfect")
  fetchRestaurant()
 },[params.rid])


console.log(restaurant," is restaurant in detail page",params ," are params")

  return (
    <div className="container mx-auto p-4">
      {/* Restaurant Information */}
      <Button className="w-10 h-10 rounded-full relative mb-2" onClick={
       ()=>{
        navigate(-1)
       }
      }>
        <ArrowLeft className="absolute" />
      </Button>
      {loading? (
        <div className="text-center">
          <p> <Loader2 className='w-4 h-4 animate-spin' /> Loading restaurant details...</p>
        </div>
      ) : null}
      <Card className="p-6 mb-8">
        <div className="flex items-center space-x-5">
         <Dialog>
          <DialogTrigger>
          <img src={restaurant?.poster} alt={restaurant?.name} className="w-24 h-24 rounded-full" />
          </DialogTrigger>
          <DialogContent className="overflow-auto">
            <img src={restaurant?.poster} alt={restaurant?.name} className="w-full h-full mt-5" />
          </DialogContent>
         </Dialog>
          <div>
            <h1 className="text-2xl font-bold">{restaurant?.name}</h1>
            <p className="text-gray-600">{restaurant?.location}</p>
            <div className="flex space-x-2 mt-2">
              {restaurant?.tags?.map((tag, index) => (
                <Badge key={index} variant="outline">
                  {tag}
                </Badge>
              ))} 
            </div>
          </div>
        </div>
      </Card>

      {/* Dishes Information */}
      <h2 className="text-xl font-semibold mb-4">Dishes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {restaurant?.dishes?.map((dish) => (
          <Card key={dish._id} className="p-4">
            <img
              src={dish.imageUrl}
              alt={dish.name}
              className="w-full h-48 object-cover mb-4 rounded-lg"
            />
            <h3 className="text-lg font-semibold">{dish.name}</h3>
            <p className="text-gray-600">{dish.description}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="text-lg font-bold">${dish.price}</span>
              <Button onClick={()=> handleAddToCart(dish)}
                disabled={authLoading}
                > {authLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to Cart" }</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GetRestaurantDetail;
