import express from 'express';
import { login, logout, signup, updateProfile, userInfo } from "../controllers/AuthController.js";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";
import { SearchContacts, getAllContacts, getContacts } from "../controllers/ContactsController.js";
import { getMessages, uploadFiles } from "../controllers/MessageController.js";
import { isAuthenticated } from '../middlewares/AuthMiddleware.js';

const Router = express.Router();

// Auth Routes
Router.post('/signup',signup);
Router.post('/signin',login);
Router.get('/user-info',isAuthenticated,userInfo);
Router.post('/update-profile',isAuthenticated,updateProfile)
Router.get('/logout',logout);

// Message Routes
Router.post('/get-messages',isAuthenticated,getMessages);
Router.post('/upload-files',isAuthenticated,uploadFiles);

// Channel Routes
Router.post('/create-channel',isAuthenticated,createChannel);
Router.get('/get-channels',isAuthenticated,getUserChannels);
Router.get('/get-channel-messages/:channelId',isAuthenticated,getChannelMessages);

// Contact Route
Router.post("/search",isAuthenticated, SearchContacts);
Router.get("/get-ALL-ContactDMList",isAuthenticated,getContacts);
Router.get('/get-all-contacts',isAuthenticated,getAllContacts);




export default Router;
