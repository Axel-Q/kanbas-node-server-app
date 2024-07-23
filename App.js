import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from 'cors';
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import AssignmentRoutes from "./Kanbas/Assignments/routes.js";
import mongoose from "mongoose";
import "dotenv/config";
import UserRoutes from "./Users/routes.js";
import session from "express-session";
import MongoStore from "connect-mongo";


// const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
// // const CONNECTION_STRING =  "mongodb://127.0.0.1:27017/kanbas"
// mongoose.connect(CONNECTION_STRING);

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

const app = express()


const allowedOrigins = ["http://localhost:3000", "https://a6--vocal-flan-317e92.netlify.app"];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: CONNECTION_STRING,
        collectionName: 'sessions',
    }),
};

if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(
    session(sessionOptions)
);
app.use(express.json());

Hello(app)
Lab5(app)
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
app.listen(process.env.PORT || 4000)

