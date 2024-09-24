import React, { Profiler } from 'react';
import { ShoppingCart, User, ClipboardList, PersonStanding, CircleUserRound, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ProfileData from './ProfileData';
import authStore from '@/store/authStore';

const Navbar = () => {
  const {user} = authStore()
  return (
    <nav className="bg-orange-600 p-4 rounded-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Company Name */}
        <Link to={"/"} className="text-white text-2xl font-bold">
          GetMyFood
        </Link>

        {/* Navigation Items */}
        <div className="flex space-x-6 items-center">
          {/* Order */}
         {!user?.isAdmin ?
         <>
          <Link to="/search?location=" className="text-white hover:text-gray-100 flex items-center gap-2">
            <Search size={20} className="inline-block mr-1" />
            Search
          </Link>
          <Link to="/orders" className="text-white hover:text-gray-100 flex items-center gap-2">
            <ClipboardList size={20} className="inline-block mr-1" />
            Orders
          </Link>

          {/* Cart */}
          <Link to="/cart" className="text-white hover:text-gray-100 flex items-center gap-2">
            <ShoppingCart size={20} className="inline-block mr-1" />
            Cart
          </Link>
         </>:
         
         <>
          <Link to="/auth/orders" className="text-white hover:text-gray-100 flex items-center gap-2">
            <ClipboardList size={20} className="inline-block mr-1" />
            Orders
          </Link>

          {/* Cart */}
          <Link to="/auth/get-restaurants" className="text-white hover:text-gray-100 flex items-center gap-2">
            <ShoppingCart size={20} className="inline-block mr-1" />
            My Restaurants
          </Link>
         </>
         }

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <Popover>
  <PopoverTrigger>
            <div className="text-white hover:text-gray-100 flex items-center gap-2">
            <CircleUserRound className='inline ' />
              Profile
            </div>
  </PopoverTrigger>
  <PopoverContent><ProfileData /></PopoverContent>
</Popover>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
