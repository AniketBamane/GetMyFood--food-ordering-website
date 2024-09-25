import React, { useState } from 'react';
import { ShoppingCart, User, ClipboardList, PersonStanding, CircleUserRound, Search, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import ProfileData from './ProfileData';
import authStore from '@/store/authStore';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // Shadcn UI Sheet for drawer

const Navbar = () => {
  const { user } = authStore();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="bg-orange-600 p-4 rounded-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Company Name */}
        <Link to="/" className="text-white text-2xl font-bold">
          GetMyFood
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <Sheet open={isDrawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu size={24} className="text-white hover:text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-4 space-x-2">
              <div className="flex flex-col space-y-4">
                <h2 className='font-bold text-2xl'>GetMyFood</h2>
                <h3 className=''>You Can go to ....</h3>

                {/* Orders */}
                {!user?.isAdmin ? (
                  <>
                    <Link to="/orders" className="text-gray-900 flex items-center gap-2">
                      <ClipboardList size={20} className="inline-block mr-1" />
                      Orders
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="text-gray-900 flex items-center gap-2">
                      <ShoppingCart size={20} className="inline-block mr-1" />
                      Cart
                    </Link>
               {/* Search */}
                <Link to="/search?location=" className="text-gray-900 flex items-center gap-2">
                  <Search size={20} className="inline-block mr-1" />
                  Search
                </Link>
                  </>
                ) : (
                  <>
                    <Link to="/auth/orders" className="text-gray-900 flex items-center gap-2">
                      <ClipboardList size={20} className="inline-block mr-1" />
                      Orders
                    </Link>

                    <Link to="/auth/get-restaurants" className="text-gray-900 flex items-center gap-2">
                      <ShoppingCart size={20} className="inline-block mr-1" />
                      My Restaurants
                    </Link>
                  </>
                )}

                {/* Profile */}
                <Popover>
                  <PopoverTrigger>
                    <div className="text-gray-900 flex items-center gap-2">
                      <CircleUserRound size={20} />
                      Profile
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <ProfileData />
                  </PopoverContent>
                </Popover>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Normal Navbar Items for Desktop */}
        <div className="hidden lg:flex space-x-6 items-center">
          {!user?.isAdmin ? (
            <>
              <Link to="/search?location=" className="text-white hover:text-gray-100 flex items-center gap-2">
                <Search size={20} className="inline-block mr-1" />
                Search
              </Link>
              <Link to="/orders" className="text-white hover:text-gray-100 flex items-center gap-2">
                <ClipboardList size={20} className="inline-block mr-1" />
                Orders
              </Link>
              <Link to="/cart" className="text-white hover:text-gray-100 flex items-center gap-2">
                <ShoppingCart size={20} className="inline-block mr-1" />
                Cart
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/orders" className="text-white hover:text-gray-100 flex items-center gap-2">
                <ClipboardList size={20} className="inline-block mr-1" />
                Orders
              </Link>
              <Link to="/auth/get-restaurants" className="text-white hover:text-gray-100 flex items-center gap-2">
                <ShoppingCart size={20} className="inline-block mr-1" />
                My Restaurants
              </Link>
            </>
          )}

          {/* Profile */}
          <Popover>
            <PopoverTrigger>
              <div className="text-white hover:text-gray-100 flex items-center gap-2">
                <CircleUserRound className="inline" />
                Profile
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <ProfileData />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
