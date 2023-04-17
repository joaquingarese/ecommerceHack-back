const { mongoose, Schema } = require("../db");

const orderSchema = new Schema(
  {
    address: String,
    status: String,
    products: [],
    totalPrice: Number,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

orderSchema.methods.toJSON = function () {
  const order = this.toObject();
  order.id = order._id.toString();
  delete order._id;
  return order;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
