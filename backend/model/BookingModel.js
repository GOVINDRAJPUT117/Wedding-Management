import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const bookingSchema = new mongoose.Schema({
  _id: Number,

  userId: {
    type: Number,
    ref: 'user',         //  Refer to user collection
  },
  
  name:{
    type: String,
    ref: 'user',         //  Refer to user collection
  },

  serviceId: {
    type: Number,
    ref: 'service',      //  Refer to service collection
  },

  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "success", "cancelled"]
  },

  serviceName: String,
  price: Number,
  info: String
});

bookingSchema.plugin(mongooseUniqueValidator);
const bookingSchemaModel = mongoose.model('booking',bookingSchema,'booking');
export default bookingSchemaModel;