const { mongoose, Schema } = require("../db");

const productSchema = new Schema(
  {
    name: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    description: String,
    photo: String,
    price: Number,
    stock: Number,
    featured: Boolean,
    slug: String,
  },
  {
    timestamps: true,
  }
);
productSchema.methods.toJSON = function () {
  const product = this.toObject();
  product.id = product._id.toString();
  delete product._id;
  product.category.id = product.category._id.toString();
  delete product.category._id;
  return product;
};
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
