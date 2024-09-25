import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"

import {  ArrowRight, Loader2, LogOut } from 'lucide-react';
import React from 'react';
import EditProfileForm from './EditProfileForm';
import { toast } from 'sonner';
import authStore from '@/store/authStore';
import { useNavigate } from 'react-router-dom';

const ProfileData = () => {
  const { loading ,logout ,user} = authStore()

  const hangleLogout = async()=>{
    console.log("button clicked !")
    try{
      await logout()
    }catch(err){
      toast.error(err.message)
    }
  }
  console.log(user,"----------------in profile data-----------------")
  return (
    <div className="p-4 bg-white rounded-md shadow-md space-y-2">
      {
        loading ? <p><Loader2 className='w-4 h-4 animate-spin' /> please wait logging out....</p> : null
      }
     {
      user ?  
      <>
      <div className='flex'>
      <h2 className='font-semibold mr-2'>Name:</h2>
      <p>{user?.name}</p>
    </div>
    <div className='flex'>
      <h2 className='font-semibold mr-2'>Email:</h2>
      <p>{user?.email}</p>
    </div>
    <div className='space-y-1'>
      <h2 className='font-semibold'>Address:</h2>
      <p>{user?.address.building}, {user?.address.street}</p>
      <p>{user?.address.city}, {user?.address.state}, {user?.address.pincode}</p>
      <p><span className='font-bold text-sm'>Landmark : </span> {user?.address.landmark}</p>
      <p><span className='font-bold text-sm'>Country : </span> {user?.address.country}</p>
    </div>
    <Dialog>
      <DialogTrigger asChild>
    <Button variant="link" disabled={loading}><ArrowRight className='mr-2' /> Edit profile</Button>
      </DialogTrigger>
      <EditProfileForm />
    <Button variant="link"  onClick={hangleLogout}><LogOut className='mr-2'
    disabled={loading}
    /> logout</Button>
    </Dialog> 
    </>
    :
    null
     }
    </div>
  );
}

export default ProfileData;
