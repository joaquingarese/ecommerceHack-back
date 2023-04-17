const { Category } = require("../models");

async function index(req, res) {
  try {
    const categoriesWithProducts = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $addFields: {
          products: {
            $map: {
              input: "$products",
              as: "product",
              in: {
                id: "$$product._id",
                name: "$$product.name",
                category: "$$product.category",
                description: "$$product.description",
                photo: "$$product.photo",
                price: "$$product.price",
                stock: "$$product.stock",
                slug: "$$product.slug",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          id: "$_id",
          name: 1,
          products: 1,
        },
      },
    ]);

    return res.json(categoriesWithProducts);
  } catch (error) {
    console.error("Error fetching categories with products:", error);
    res
      .status(500)
      .json({ message: "Error fetching categories with products" });
  }
}

async function store(req, res) {
  try {
    const newCategory = new Category({
      name: req.body.newCategoryName,
    });

    await newCategory.save();
    res.json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  index,
  store,
};
