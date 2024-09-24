import React, { useState } from 'react';
;
import { Mail, Lock, Home, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import authStore from '@/store/authStore';
import { toast } from 'sonner';
import { useEffect } from 'react';

const Signup = () => {
  const {loading , signup,verification} = authStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      building: '',
      landmark: '',
      country: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [addressField]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignup = async() => {
    console.log('Signup Data:', formData);
    try{
      const signUpFormData = new FormData()
      signUpFormData.append('name', formData.name)
      signUpFormData.append('email', formData.email)
      signUpFormData.append('password', formData.password)
      signUpFormData.append('address', JSON.stringify(formData.address))
      await signup(signUpFormData)
    }catch(err){
      toast.error(err.message)
    }
  };

  useEffect(()=>{
    if(verification.email == null){
      navigate("/verification") 
    }
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 text-center">
          GetMyFood
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Your favorite food, delivered fresh!
        </p>

        {/* Signup Heading */}
        <p className="text-lg text-gray-700 mt-8 text-center">
          Create your account
        </p>

        {/* Name Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <Input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={loading}
          />
        </div>

        {/* Email Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Mail size={20} />
            </span>
            <Input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Lock size={20} />
            </span>
            <Input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Address Inputs */}
        <div className="mt-6">
          <h3 className="text-md font-semibold text-gray-700">Address</h3>

          <div className="mt-4">
            <Input
              type="text"
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mt-4">
            <Input
              type="text"
              name="address.building"
              placeholder="Building"
              value={formData.address.building}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mt-4">
            <Input
              type="text"
              name="address.landmark"
              placeholder="Landmark"
              value={formData.address.landmark}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <Input
              type="text"
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <Input
              type="text"
              name="address.pincode"
              placeholder="Pincode"
              value={formData.address.pincode}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
            <Input
              type="text"
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleInputChange}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Signup Button */}
        <div className="mt-6">
          <Button
            variant="solid"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleSignup}
            disabled={loading}
          >
           {loading ? <Loader2 className='w-4 h-4 animate-spin' /> :null} Sign Up
          </Button>
        </div>

        {/* Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account? 
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium"
            disabled={loading}
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
