import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
import cors from "cors";
import { handlePreflight } from "./src/routes/auth/middleware.js";
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import passport from "passport";
import "./src/mongodb/LivePrices.js";
const { connect } = mongoose;

connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 100000
})
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch(err => console.log(`ERROR In Connection: \n ${err}`));

const [app, port] = [express(), process.env.PORT || 3000];

app.use(json());
app.use(urlencoded({ extended: true }));
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
var sessionStorage = new store({
    uri: process.env.MONGO_URI,
    collection: "mySessions",
    connectionOptions: {
        serverSelectionTimeoutMS: 90000
    },
    optionsSuccessStatus: 200
});

sessionStorage.on('error', function (err) {
    console.log(err);
});
const isProduction = process.env.NODE_ENV === 'production';
app.use(session({
    store: sessionStorage,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 12 * 60 * 60 * 1000,
        secure: isProduction,
        httpOnly: !isProduction,
        sameSite: isProduction ? 'strict' : 'lax'
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
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin", Router);

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
