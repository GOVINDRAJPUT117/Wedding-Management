import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const serviceSchema = mongoose.Schema({
    _id:Number,
    service_name:{
        type:String,
        lowercase:true,
        trim:true,
        required:[true,'service Name is Required']
    },
     category: {
    type: Number,
    ref: "category",
   
  }
    ,
    service_description:{
        type:String,
        lowercase:true,
        required:[true,"Description is required"],
        trim:true,
    },
     service_image:{
        type:String,
        required:[true,"service Icon is required"],
        trim:true,
    },
    service_price:{
        type:Number,
        required:[true,'service Price is required'],
    },
    uid:String,
    info:String,

   
})

serviceSchema.plugin(mongooseUniqueValidator);
const serviceSchemaModel = mongoose.model('service',serviceSchema);
export default serviceSchemaModel;