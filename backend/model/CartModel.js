import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
const cartSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: "user",
    required: true
  },
  items: [
    {
      serviceId: {
        type: Number,
        ref: "service",
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
}, {
  timestamps: true
});
cartSchema.plugin(mongooseUniqueValidator);
const cartSchemaModel = mongoose.model('cart',cartSchema);
export default cartSchemaModel;


