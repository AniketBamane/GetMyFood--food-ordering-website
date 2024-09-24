import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import searchStore from '@/store/searchStore';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

// Sample restaurant data for demonstration purposes
const sampleRestaurants = [
  {
    _id: "1",
    name: "Italian Delight",
    location: "New York",
    tags: ["Italian", "Pizza", "Fast Food"],
    poster: "https://via.placeholder.com/300",
  },
  {
    _id: "2",
    name: "Sushi World",
    location: "San Francisco",
    tags: ["Japanese", "Sushi", "Fine Dining"],
    poster: "https://via.placeholder.com/300",
  },
  {
    _id: "3",
    name: "Spice Route",
    location: "Los Angeles",
    tags: ["Indian", "Spicy", "Vegetarian"],
    poster: "https://via.placeholder.com/300",
  },
  // Add more sample data as needed
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState(sampleRestaurants);
  const [searchParams] = useSearchParams();
  const {searchByLocation,results,loading} = searchStore()
  const navigate = useNavigate()
  const handleSearch = () => {
    const filteredRestaurants = sampleRestaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
  };
  const fetchResultAtLoad =async()=>{
    const toastId = toast.loading("please wait,fetching results.....");
    try{
      await searchByLocation(searchParams.get("location"))
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
    fetchResultAtLoad()
  },searchParams)
   console.log(results)
  return (
    <div className="container mx-auto p-6">
      <Button className="w-10 h-10 rounded-full relative" onClick={()=>{
        navigate(-1);
      }}>
        <ArrowLeft className='absolute' />
      </Button>
      <div className="mb-2 flex items-center space-x-2 w-[80%] mx-auto">
        <Input
          placeholder="Search for restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md flex-grow"
        />
        <Button onClick={handleSearch} >
          <Search />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && (
          <p className="text-center text-gray-600"><Loader2 className='w-4 h-4 animate-spin' /> Loading...</p>
        )}
        {results.length === 0 && (
          <p className="text-center text-gray-600">No restaurants found.</p>
        )}
        {results.map((restaurant) => (
        
          <Card key={restaurant._id} className="border p-4 shadow-sm cursor-pointer"
          onClick={()=>{
            navigate(`/restaurants/${restaurant._id}`);
          }}
          >
            <img
              src={restaurant.poster}
              alt={restaurant.name}
              className="w-full h-48 object-cover rounded-md"
              />
            <h2 className="text-lg font-bold mt-4">{restaurant.name}</h2>
            <p className="text-sm text-gray-600">Location: {restaurant.location}</p>
            <div className="flex flex-wrap mt-2">
              {restaurant.tags.map((tag, index) => (
                <span
                key={index}
                className="text-xs bg-gray-200 text-gray-700 py-1 px-2 rounded-md mr-2 mb-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Card>
            
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
