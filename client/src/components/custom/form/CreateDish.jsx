import React, { useState } from 'react';
import { Input } from "@/components/ui/input"; // Import Shadcn UI Input
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button
import { Label } from "@/components/ui/label"; // Import Shadcn UI Label
import { toast } from 'sonner'; // Optional: For toast notifications
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import adminStore from '@/store/adminStore';
import { Loader2 } from 'lucide-react';

const CreateDish = ({update=false,id=""}) => {
  // State to manage form input
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });

  const {createDish,updateDish,deleteDish,restaurant,loading} = adminStore()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image input
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const newFormData = new FormData()
      newFormData.append("name",formData.name)
      newFormData.append("description",formData.description)
      newFormData.append("price",formData.price)
      newFormData.append("image",formData.image)
      newFormData.append("restaurantId",restaurant._id)
      if(!update){
        await createDish(newFormData)
      }else{
        await updateDish(newFormData,id)
      }
    }catch(err){
      toast.error(err.message)
    }
  };

  return (
   <DialogContent>
    <DialogHeader>
      <DialogTitle>{update ? "update Dish ": "Create Dish"}</DialogTitle>
      <DialogDescription>
        {update ? "Update a dish": "Create a new dish"} for your restaurant.
      </DialogDescription>
      <Label>
        Add to menu
      </Label>
    </DialogHeader>
    <form onSubmit={handleSubmit} className='space-y-2'>
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name">Dish Name</Label>
        <Input 
          id="name"
          name="name"
          type="text"
          placeholder="Enter dish name"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Description Field */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          type="text"
          placeholder="Enter dish description"
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Price Field */}
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Enter dish price"
          value={formData.price}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <Label htmlFor="image">Dish Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit"
      disabled={loading}
      >
        {loading ? <Loader2 className='w-4 h-4 animate-spin' /> :null}{update ? "Update dish":"Create dish"}
      </Button>
    </form>
   </DialogContent>
  );
};

export default CreateDish;
