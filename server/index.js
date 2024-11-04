import cookieParser from "cookie-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import { connect } from './config/database.js';
import apiroutes from './routes/index.js';
import socketSetup from './socket.js';
import session from "express-session";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors({
    origin: process.env.ORIGIN,  
    credentials: true,  
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],  
}));

// For google auth
app.use(session({
    resave : false,
    saveUninitialized : true,
    secret : process.env.SESSION_SECRET
}));

app.use('/api',apiroutes);

const server = app.listen(port, async () => {
    console.log(`server started on port ${port}`);
    await connect();
    console.log(`Mongo db connected`);
})

socketSetup(server);

