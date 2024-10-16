import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import { handlePreflight } from "./src/routes/auth/middleware.js";
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import passport from "passport";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Determine the base directory
const baseDir = process.env.NODE_ENV === 'production' ? path.join(process.cwd(), "/server") : __dirname;
import "./src/mongodb/LivePrices.js";
const { connect } = mongoose;

connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 100000
})
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch(err => console.log(`ERROR In Connection: \n ${err}`));

const [app, port] = [express(), process.env.PORT || 3000];

app.use(json());
app.use(express.static(path.join(baseDir, "./public/")))
app.use(urlencoded({ extended: true }));
app.set('trust proxy', 1); // trust first proxy

const allowedOrigins = {
    development: 'http://localhost:5173',
    production: 'https://www.genesisio.xyz'
};
let corsOptions = {
    origin: allowedOrigins[process.env.NODE_ENV],
    methods: ["POST", "GET", "PATCH", "DELETE", "PUT", "OPTIONS"],
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(handlePreflight);

const store = new MongoDBStore(session);
const userSessionStore = new store({
    uri: process.env.MONGO_URI,
    collection: "userSessions",
    connectionOptions: {
        serverSelectionTimeoutMS: 90000
    },
    optionsSuccessStatus: 200
});

const adminSessionStore = new store({
    uri: process.env.MONGO_URI,
    collection: "adminSessions",
    connectionOptions: {
        serverSelectionTimeoutMS: 90000
    },
    optionsSuccessStatus: 200
});

userSessionStore.on('error', function (err) {
    console.log("User session store error:", err);
});

adminSessionStore.on('error', function (err) {
    console.log("Admin session store error:", err);
});
const isProduction = process.env.NODE_ENV === 'production';
// User session middleware for /api routes
app.use('/api', session({
    store: userSessionStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: 'user_sid',  // Distinct cookie for users
        maxAge: 12 * 60 * 60 * 1000,  // 12 hours
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'None' : 'lax'
    }
}));

// Admin session middleware for /admin routes
app.use('/admin', session({
    store: adminSessionStore,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        name: 'admin_sid',  // Distinct cookie for admins
        maxAge: 12 * 60 * 60 * 1000,  // 12 hours
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'None' : 'lax'
    }
}));

app.use(passport.initialize());
app.use(passport.session());

import authRouter from "./src/routes/auth/authRouter.js";
import router from "./src/routes/Router.js";
import adminAuthRouter from "./src/routes/admin/authRouter.js";
import { Router } from "./src/routes/admin/adminRouter.js";

app.use("/api/auth", authRouter);
app.use("/api", router);
app.use("/admin/auth", adminAuthRouter);
app.use("/admin", Router);

app.get("/", (req, res) => {
    res.json([
        {
            "joke": "Why don't crypto traders ever get lost? Because they always follow the blockchain!"
        },
        {
            "joke": "Why did the Bitcoin break up with the dollar? It found someone more stable."
        },
        {
            "joke": "Why was the computer cold? It left its Windows open and started mining Bitcoin!"
        }
    ]);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}/`));
