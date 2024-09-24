import React, { useState } from 'react';

import { Mail, Lock, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import authStore from '@/store/authStore';
import { toast } from 'sonner';

const Login = () => {
  const {loading,login} = authStore()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin =async () => {
    // Add your login logic here
    console.log(`Logging in with Email: ${email}, Password: ${password}`);
    try{
      const formData = new FormData()
      formData.append('email',email)
      formData.append('password',password)
      await login(formData)
    }catch(err){
      toast.err(err.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 text-center">
          GetMyFood
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Your favorite food, delivered fresh!
        </p>

        {/* Login Heading */}
        <p className="text-lg text-gray-700 mt-8 text-center">
          Login to your account
        </p>

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
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Login Button */}
        <div className="mt-6">
          <Button
            variant="solid"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleLogin}
            disabled={loading}
          >
           {loading ? <Loader2 className='w-4 h-4 animate-spin' /> :null}  Login
          </Button>
        </div>

        {/* Signup Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? 
            <Link to="/signup" className="text-orange-600 hover:text-orange-700 font-medium"
            disabled={loading}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
