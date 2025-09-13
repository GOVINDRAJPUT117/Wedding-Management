import express from "express";
import bodyParser from "body-parser";
import MongoStore from 'connect-mongo';
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import serviceRoute from './routes/serviceRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import cartRoute from './routes/cartRoute.js'
import dotenv from "dotenv";
dotenv.config(); // .env file ke variables ko process.env me load karega

import cors from 'cors'
import session from 'express-session'
import fileUpload from "express-fileupload";



const app = express()


//to extract body data from request(POST, PUT, DELETE, PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({secret:'gfbhmgfxjngfd'}))
app.use(session({
    secret: process.env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/your-db-name' }),
    cookie: { secure: false } // true अगर HTTPS use कर रहे हैं
}));
app.use(fileUpload())
app.use(
    cors({
        origin: ["https://wedding-management-1-4noj.onrender.com"], // tumhara frontend ka URL
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"], //New Thing
        credentials: true,
    })
);

//New thing:-
app.options("*", cors());

app.use('/upload', express.static('upload'));

//Route level Middleware
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/service", serviceRoute);
app.use("/booking", bookingRoute);
app.use("/cart", cartRoute);



app.listen(3000, () => {
    console.log("Server running on port 3000");
});
