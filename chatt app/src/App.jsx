/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { useAppStore } from './store';


const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to = "/auth"/>
}

const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to = "/chat"/> : children;
}

const App = () => {
  
  const {userInfo , setUserInfo} = useAppStore();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8747/api/user-info", { withCredentials: true });
         
        if (response.status === 201 && response.data?.data?._id) {
          setUserInfo(response.data.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);  // Set loading to false after fetching data
      }
    };
  
    if (!userInfo) {
      setLoading(true);   // Start loading before fetching data
      getUserData();
    }
  }, [userInfo, setUserInfo]);
  
  
  if(loading){
    return <div>loading....</div>;
  }

  return (

    <BrowserRouter>
        <Routes>
          <Route  
            path="/auth"  
            element ={
              <AuthRoute>
                <Auth/>
              </AuthRoute>
            }
          />
          <Route  
            path="/profile"  
            element ={
              <PrivateRoute>
                <Profile/>
              </PrivateRoute>
              }
          />
          <Route  
            path="/chat"  
            element ={
              <PrivateRoute>
                <Chat/>
              </PrivateRoute>
            } 
          />
          <Route  path="*"  element ={ <Navigate to ="/auth"/>} />
        </Routes>
    </BrowserRouter>

  )
}

export default App