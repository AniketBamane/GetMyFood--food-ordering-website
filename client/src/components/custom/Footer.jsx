import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className=" py-8">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 sm:space-y-10 ">
        {/* Company Info */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h2 className="text-xl font-bold mb-4">FoodDelivery</h2>
          <p className="mb-4">Delivering deliciousness to your doorsteps with a smile. Quality food, fast delivery, and excellent service.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className='space-y-2'>
            <li>
              <Link to="/prders" className="hover:text-gray-400">Orders</Link>
            </li>
            <li>
              <Link to="cart" className="hover:text-gray-400">Cart</Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-gray-400">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us" className="hover:text-gray-400">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul>
            <li>
              <a href="mailto:support@fooddelivery.com" className="hover:text-gray-400">support@fooddelivery.com</a>
            </li>
            <li>
              <a href="tel:+1234567890" className="hover:text-gray-400">+1 (234) 567-890</a>
            </li>
            <li>
              <p className="text-gray-400">123 Food Street, Delicious City, DA 12345</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    {/* Bottom Section */}
    <div className="text-center py-4">
      <p className="text-sm">&copy; {new Date().getFullYear()} FoodDelivery. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
