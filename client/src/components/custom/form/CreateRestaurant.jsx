import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import adminStore from "@/store/adminStore";
import { Loader2 } from "lucide-react";


const CreateRestaurant = ({update=false,id=""}) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    tags: "",
    image: null,
  });
  const {createRestaurant,loading,updateRestaurant} = adminStore()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0], // Store the image file
    });
  };

  const handleSubmit = async() => {
    try{
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("location", formData.location);
      formDataWithImage.append("tags", JSON.stringify(formData.tags.split(",")));
      formDataWithImage.append("image", formData.image);

      console.log(formDataWithImage.get("tags"))
      
      if(!update){
        await createRestaurant(formDataWithImage);
      }else{
        await updateRestaurant(formDataWithImage,id);
      }
      setFormData({
        name: "",
        location: "",
        tags: "",
        image: null,
      });
    }catch(err){
      toast.error(err.message)
    }
  };

  return (
   <DialogContent>
    <DialogHeader>
      <DialogTitle>{update ? "Update Restaurant":"Create a new restaurant"}</DialogTitle>
      <DialogDescription>
        {update ? "update Restaurant" : "Create a new restaurant"} by providing its name, location, tags, and a poster image.
      </DialogDescription>
    </DialogHeader>
    <form className="space-y-2">
      <div>
        <Label htmlFor="name" className="block text-sm font-medium">
          Restaurant Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter restaurant name"
          className="mt-1"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="location" className="block text-sm font-medium">
          Location
        </Label>
        <Input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter restaurant location"
          className="mt-1"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="tags" className="block text-sm font-medium">
          Tags (comma-separated)
        </Label>
        <Textarea
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. Fast Food, Italian"
          className="mt-1"
          disabled={loading}
        />
      </div>

      <div>
        <Label htmlFor="image" className="block text-sm font-medium">
          Restaurant Image
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          onChange={handleImageChange}
          className="mt-1"
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full"
      disabled={loading}
      onClick={handleSubmit}
      >
       {loading ? <Loader2 className="w-4 h-4 animate-spin" /> :null} Submit
      </Button>
    </form>
   </DialogContent>
  );
};

export default CreateRestaurant;
