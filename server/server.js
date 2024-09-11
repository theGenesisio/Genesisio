import dotenv from "dotenv";
dotenv.config()
import express, { json, urlencoded } from "express"
import cors from "cors"
import mongoose from 'mongoose';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import passport from "passport"
import "./src/mongodb/LivePrices.js"
const { connect, connection } = mongoose;
// ** Connect to database and log each level
const [uri, dbName, collectionName] = ["localhost" || "127.0.0.1" || "0.0.0.0", "genesisio", "mySessions"]
// for local db connection
// connection.on('connected', () => console.log(`${dbName.toUpperCase()} connected`));
// connection.on('open', () => console.log(`${dbName.toUpperCase()} connection open`));
// connection.on('disconnected', () => console.log(`${dbName.toUpperCase()} disconnected`));
// connection.on('reconnected', () => console.log(`${dbName.toUpperCase()} reconnected`));
// connection.on('disconnecting', () => console.log(`${dbName.toUpperCase()} disconnecting`));
// connection.on('close', () => console.log(`${dbName.toUpperCase()} connection closed`));
// connect(`mongodb://${uri}/${dbName}`, {
//     serverSelectionTimeoutMS: 60000
// })
//     .then(() => console.log(`${dbName.toUpperCase()} connected successfully at ${uri}`))
//     .catch(err => console.log(`ERROR In Connection to ${dbName} \n ${err}`));
connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 60000
})
    .then(() => console.log('Connected to MongoDB Atlas successfully'))
    .catch(err => console.log(`ERROR In Connection: \n ${err}`));

const [app, port] = [express(), process.env.PORT || 3000]
// ** Enable reading of body object from requests
app.use(json())
app.use(urlencoded({ extended: true }))
//todo update to domain
app.use(cors({
    origin: ['http://localhost:5173', 'https://genesisio.xyz', 'https://www.genesisio.xyz'],
    methods: ["POST", "GET", "PATCH"],
    credentials: true
}));
// ** Enable session storage
const store = new MongoDBStore(session);
var sessionStorage = new store({
    uri: process.env.MONGO_URI,
    // uri: `mongodb://${uri}/${dbName}`,
    collection: collectionName,
    connectionOptions: {
        serverSelectionTimeoutMS: 60000
    }
});

// Catch errors
sessionStorage.on('error', function (err) {
    console.log(err);
});
app.use(session({
    store: sessionStorage,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 12 * 60 * 60 * 1000,
        secure: false, // Set secure: true if using HTTPS
    }
}));
app.use(passport.initialize())
app.use(passport.session())
// ** Configure routing
import authRouter from "./src/routes/auth/authRouter.js"
import router from "./src/routes/Router.js";
import adminAuthRouter from "./src/routes/admin/authRouter.js";
import { Router } from "./src/routes/admin/adminRouter.js";
app.use("/api/auth", authRouter)
app.use("/api", router)
app.use("/api/admin/auth", adminAuthRouter)
app.use("/api/admin", Router)
app.listen(port, () => console.log(`Server running at http://localhost:${port}/`))