import CreateDish from "@/components/custom/form/CreateDish";
import CreateRestaurant from "@/components/custom/form/CreateRestaurant";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import adminStore from "@/store/adminStore";
import { ArrowLeft, Trash } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const RestaurantDetail = () => {
  const { id } = useParams();
  const {getRestaurantById,restaurant,deleteDish,loading} = adminStore()
  const navigate = useNavigate()

  const getCurrentRestaurantById = async (id) => {
    try{
      await getRestaurantById(id)
    }catch(err){
      toast.error(err.message)
    }
  }

  const handleDeleteDish = async (id)=>{
   const toastId =  toast.loading("please wait , dish is getting deleted ...")
    try{
      await deleteDish(id,restaurant._id)
    }catch(err){
      toast.error(err.message,{
        id:toastId
      })
    }finally{
      setTimeout(()=>{
        toast.dismiss(toastId)
      },1000)
    }
  }

  useEffect(()=>{
    getCurrentRestaurantById(id)
  },[])
  console.log(restaurant)
  // Sample restaurant data
  // const restaurant = {
  //   _id: "1",
  //   name: "Pizza Palace",
  //   location: "New York",
  //   tags: ["Fast Food", "Pizza"],
  //   poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigMr5-v6JznR5POmtYgryJjINUk0aj37vXg&s",
  // };



  return (
    <div className="p-2">
          <Button className="w-10 h-10 rounded-full relative"
          onClick={()=>{
            navigate(-1)
          }}
          >
            <ArrowLeft size={15} className="absolute" />
          </Button>
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <img src={restaurant.poster} alt={restaurant.name} className="w-full flex-grow h-64 object-cover rounded-md" />
        <div className="flex justify-between">
        <h1 className="text-3xl font-semibold mt-4">{restaurant.name}</h1>
        <Dialog>
          <DialogTrigger>
          <Button className="mt-4">
              Update Shop
            </Button>
          </DialogTrigger>
          <CreateRestaurant update={true} id={restaurant._id} />
        </Dialog>
            </div>
        <p className="text-gray-600 mt-2">{restaurant.location}</p>
        <div className="mt-4 space-x-2">
          {restaurant.tags?.map((tag, index) => (
            <span key={index} className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
              {tag}
            </span>
          ))}
        </div>
 
      </div>

      <div className="flex justify-between items-center mb-2">
      <h2 className="text-2xl font-semibold mb-4">Dishes</h2>
      <Dialog>
        <DialogTrigger>
          <Button>
            Create Dish
          </Button>
        </DialogTrigger>
        <CreateDish />
      </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.dishes?.length == 0 && 
        (
          <p>No Dish Available !</p>
        )}
        {restaurant.dishes?.map((dish) => (
          <Card key={dish._id} className="shadow-md hover:shadow-lg transition duration-300">
            <CardHeader>
              <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover" />
            </CardHeader>
            <CardContent>
              <h2 className="text-xl font-semibold">{dish.name}</h2>
              <p className="text-gray-600">{dish.description}</p>
              <p className="mt-2 text-lg font-semibold">₹{dish.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
<Dialog>
  <DialogTrigger>
  <Button className="mt-4"
  disabled={loading}
  >
              Update Dish
            </Button>
          </DialogTrigger>
          <CreateDish update={true} id={dish._id} />
</Dialog>
  <Button className="mt-4" onClick={async()=>{
    await handleDeleteDish(dish._id)
  }}
  disabled={loading}
  >
              <Trash />
            </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
