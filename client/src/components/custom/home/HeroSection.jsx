import React, { useState } from 'react';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    navigate(`/search?location=${searchTerm}`)
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between  p-8 md:p-12">
      {/* Left Container */}
      <div className="flex-grow flex flex-col justify-center space-y-6 text-center md:text-left">
        <h1 className="text-4xl font-bold text-orange-600">
          Get Your Food at Your Doorstep
        </h1>
        <p className="text-lg text-gray-700">
          We have partnered with all the top restaurants from your locality to bring you the best dishes, delivered fresh!
        </p>
        <p className="text-lg text-gray-700">
          Search for your favorite food and order now.
        </p>

        {/* Search Bar */}
        <div className="flex items-center mt-4 space-x-2 justify-center md:justify-start">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={20} />
            </span>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="pizza, near ranibaug, pizza galeria ...."
              className="pl-10"
            />
          </div>
          <Button
            variant="solid"
            className="bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Right Container - Image */}
      <div className="flex-shrink-0 mt-6 md:mt-0 md:ml-8">
        <img
          src="https://www.caterninja.com/frontend/web/images/app_img/no-image.jpg"
          alt="Hero"
          className="w-full h-auto max-w-md rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
