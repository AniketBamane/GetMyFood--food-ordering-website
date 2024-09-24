import React, { useState } from 'react';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import authStore from '@/store/authStore';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';


const EditProfileForm = () => {
  const {loading,updateProfile} = authStore()
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      building: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      country: ''
    }
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address')) {
      const field = name.split('.')[1]; // Extract address field name
      setFormData((prevData) => ({
        ...prevData,
        address: { ...prevData.address, [field]: value }
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const newFormData = new FormData()
      newFormData.append("name",formData.name)
      newFormData.append("address",JSON.stringify(formData.address))
      console.log(newFormData)
      console.log(formData)
      await updateProfile(newFormData)
      setFormData({
        name: '',
        address: {
          street: '',
          building: '',
          city: '',
          state: '',
          pincode: '',
          landmark: '',
          country: ''
        }
      })
    }catch(err){
      toast.error(err.message)
    }
    // Add your form submission logic here
  };

  return (
    <DialogContent className="max-h-[90vh] overflow-y-auto">
      <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Update your profile information below.
      </DialogDescription>
      </DialogHeader>
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded-lg space-y-4">

      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 font-medium">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2"
          placeholder="Enter your name"
          disabled={loading}
        />
      </div>

      {/* Address Section */}
      <div className="space-y-2">
        <h3 className="font-semibold">Address</h3>

        {/* Building Field */}
        <div className="flex flex-col">
          <label htmlFor="building" className="mb-1 font-medium">Building</label>
          <input
            type="text"
            id="building"
            name="address.building"
            value={formData.address.building}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter building name"
          disabled={loading}

            />
        </div>

        {/* Street Field */}
        <div className="flex flex-col">
          <label htmlFor="street" className="mb-1 font-medium">Street</label>
          <input
            type="text"
            id="street"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter street name"
          disabled={loading}

            />
        </div>

        {/* City Field */}
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-1 font-medium">City</label>
          <input
            type="text"
            id="city"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter city"
          disabled={loading}

          />
        </div>

        {/* State Field */}
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-1 font-medium">State</label>
          <input
            type="text"
            id="state"
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter state"
          disabled={loading}

          />
        </div>

        {/* Pincode Field */}
        <div className="flex flex-col">
          <label htmlFor="pincode" className="mb-1 font-medium">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="address.pincode"
            value={formData.address.pincode}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter pincode"
          disabled={loading}

          />
        </div>

        {/* Landmark Field */}
        <div className="flex flex-col">
          <label htmlFor="landmark" className="mb-1 font-medium">Landmark</label>
          <input
            type="text"
            id="landmark"
            name="address.landmark"
            value={formData.address.landmark}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter landmark"
          disabled={loading}

            />
        </div>

        {/* Country Field */}
        <div className="flex flex-col">
          <label htmlFor="country" className="mb-1 font-medium">Country</label>
          <input
            type="text"
            id="country"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            className="border border-gray-300 rounded-md p-2"
            placeholder="Enter country"
          disabled={loading}

            />
        </div>
      </div>

      {/* Submit Button */}
      <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600"
          disabled={loading}
      >
      {loading ? <Loader2 className='w-4 h-4 animate-spin' /> :null}  Save Changes
      </Button>
    </form>
</DialogContent>
  );
};

export default EditProfileForm;
