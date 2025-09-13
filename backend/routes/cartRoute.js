import express from "express";
const route = express.Router();
import * as cartController from '../controller/CartController.js'
route.post("/cartservice",cartController.addToCart);


export default route;
