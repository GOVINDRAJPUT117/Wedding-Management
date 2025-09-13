import '../connection/dbconfig.js'
import cartSchemaModel from "../model/CartModel.js"; 


export const addToCart = async (req, res) => {
  const { userId, serviceId, quantity = 1 } = req.body;

  try {
    let cart = await cartSchemaModel.findOne({ userId });

    if (!cart) {
      cart = await cartSchemaModel.create({ userId, items: [{ serviceId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.serviceId === serviceId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ serviceId, quantity });
      }
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
