import express from "express";
import bodyParser from "body-parser";
import userRoute from './routes/userRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import serviceRoute from './routes/serviceRoute.js'
import bookingRoute from './routes/bookingRoute.js'
import cartRoute from './routes/cartRoute.js'

import cors from 'cors'
import session from 'express-session'
import fileUpload from "express-fileupload";



const app = express()


//to extract body data from request(POST, PUT, DELETE, PATCH)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:'gfbhmgfxjngfd'}))
app.use(fileUpload())
app.use(cors());

app.use('/upload', express.static('upload'));

//Route level Middleware
app.use("/user",userRoute);
app.use("/category",categoryRoute);
app.use("/service",serviceRoute);
app.use("/booking",bookingRoute);
app.use("/cart",cartRoute );



app.listen(8988);

