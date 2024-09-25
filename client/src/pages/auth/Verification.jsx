import React, { useState } from 'react';

import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import authStore from '@/store/authStore';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';

const verification = () => {
  const {verification,loading,verifyEmail,} = authStore()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate()

  const handleSendEmail = async () => {
    console.log(`Sending verification to: ${email}`);
    try{
      await verifyEmail(email)
      console.log(verification)
    }catch(err){
       toast(err.message)
    }
  };

  const handleVerifyOtp = () => {
    console.log(`Verifying OTP: ${otp}`);
    try{
      if(verification.verificationCode == otp){
        toast('Email verified successfully')
        
        navigate("/signup")
      }else{
        toast.error("entered verification code is not valid !")
      }
    }catch(err){
       toast(err.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-orange-600 text-center">
          GetMyFood
        </h1>
        <p className="text-sm text-gray-600 text-center mt-2">
          Your favorite food, delivered fresh!
        </p>
        
        <p className="text-lg text-gray-700 mt-8 text-center">
          Let's get your email verified!
        </p>
        <p className="text-sm text-gray-600 text-center mt-2">
          Already have an account ? <Link to={"/login"} className='underline font-bold'>login</Link>
        </p>
        {/* Email Input */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Enter your email
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

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            variant="solid"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleSendEmail}
            disabled={loading}
          >
          {loading ? <Loader2 className='mr-2 w-4 h-4 animate-spin' /> : null}  Send Verification Code
          </Button>
        </div>

        {/* OTP Input Field */}
        {verification.verificationCode && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Enter the OTP sent to your email
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <CheckCircle size={20} />
              </span>
              <Input
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="pl-10"
                required
                disabled={loading}
              />
            </div>

            <div className="mt-6">
              <Button
                variant="solid"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleVerifyOtp}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 w-4 h-4 animate-spin" /> : null } Verify OTP
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default verification;
