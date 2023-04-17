const { mongoose, Schema } = require("../db");

const categorySchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

categorySchema.methods.toJSON = function () {
  const category = this.toObject();
  category.id = category._id.toString();
  delete category._id;
  return category;
};
const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
