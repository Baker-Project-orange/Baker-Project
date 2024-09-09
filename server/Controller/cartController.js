const { default: mongoose } = require("mongoose");
const Cart = require("../Models/cart");

exports.addToCart = async (req, res) => {
  const cartData = req.body;
  const userID = req.user;
  cartData.userId = userID;
  try {
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    const cart = new Cart({ ...cartData, _id: new mongoose.Types.ObjectId() });
    await cart.save();

    res.status(201).json({ message: "cart added successfully", cart });
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching cart", error: error.message });
  }
};

exports.checkout = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    const order = new Order({
      userId,
      items: cart.items,
      total: cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    });

    await order.save();
    await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

    res
      .status(200)
      .json({ message: "Checkout successful", orderId: order._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during checkout", error: error.message });
  }
};
