/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthForm = ({
  activeTab,
  setActiveTab,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const { setUserInfo } = useAppStore();


  const validateLogin = () => {
    if (!email || !password) {
      toast.error('All fields are required');
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!email || !password || !confirmPassword) {
      toast.error('All fields are required');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const GooglehandleLogin = async () => {
    try {
      
      window.location.href = "http://localhost:3000/api/auth/google";
    } catch (error) {
      console.error(error);
      toast.error('Sign in failed');
    }
  }

  const handleLogin = async () => {
    if (!validateLogin()) return;
    try {
      const response = await axios.post("http://localhost:3000/api/signin", { email, password }, { withCredentials: true });
      if (response.data?.data?._id) {
        setUserInfo(response.data.data);
        navigate(response.data.data.defaultProfile === false ? '/profile' : '/chat');
      }
    } catch (error) {
      toast.error('Signin failed');
    }
  };

  const handleSignup = async () => {
    if (!validateSignup()) return;
    try {
      const response = await axios.post("http://localhost:3000/api/signup", { email, password }, { withCredentials: true });
      if (response.status === 201) {
        setUserInfo(response.data.data);
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Signup failed');
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="flex justify-center bg-transparent rounded-none w-full mb-5">
        <TabsTrigger
          className="w-1/2 text-center data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 text-gray-600 p-3 md:p-4 font-semibold transition-all duration-300 cursor-pointer hover:text-purple-600"
          value="login"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          className="w-1/2 text-center data-[state=active]:bg-transparent data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 text-gray-600 p-3 md:p-4 font-semibold transition-all duration-300 cursor-pointer hover:text-purple-600"
          value="signup"
        >
          Signup
        </TabsTrigger>
      </TabsList>

      <TabsContent className="flex flex-col w-full gap-5" value="login">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-600"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-md focus:border-purple-500 focus:ring-2 focus:ring-purple-600"
        />
        <Button onClick={handleLogin} className="rounded-2xl cursor-pointer px-4 py-3">Login</Button>
        <Button onClick={GooglehandleLogin} className="rounded-2xl cursor-pointer px-4 py-3">Google Auth</Button>
      </TabsContent>

      <TabsContent className="flex flex-col w-full gap-5" value="signup">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-purple-600 focus:border-purple-500"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-purple-600 focus:border-purple-500"
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-md focus:ring-2 focus:ring-purple-600 focus:border-purple-500"
        />
        <Button onClick={handleSignup} className="rounded-2xl cursor-pointer px-4 py-3">SignUp</Button>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;