const { Order, Product, User } = require("../models");

async function index(req, res) {
  try {
    const orders = await Order.find({}).populate("user");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function store(req, res) {
  try {
    let orderProducts = req.body.products;
    let productsId = orderProducts.map((product) => product.id);
    let originalProducts = await Product.find({ id: { $in: productsId } });
    let availableStock = true;

    console.log(originalProducts);

    for (let i = 0; i <= orderProducts.length - 1; i++) {
      if (orderProducts[i].quantity > originalProducts[i].stock) {
        availableStock = false;
      }
    }
    if (availableStock === true) {
      // Puts the price of the originalProducts in the orderProducts:
      orderProducts = orderProducts.map((product) => {
        const originalProduct = originalProducts.find(
          (original) => original.id.toString() === product.id
        );
        return {
          ...product,
          price: originalProduct.price,
        };
      });

      // Calculate the total price:
      let totalPrice = 0;
      orderProducts.forEach((product) => {
        totalPrice += product.price * product.quantity;
      });

      // Update stock of the originalProducts and save them
      for (const productOrder of orderProducts) {
        const originalProduct = originalProducts.find(
          (original) => original.id.toString() === productOrder.id
        );

        if (originalProduct) {
          originalProduct.stock -= productOrder.quantity;
          await originalProduct.save();
        }
      }

      const newOrder = await Order.create({
        address: req.body.address,
        status: "recibido",
        products: req.body.products,
        totalPrice: totalPrice,
        user: req.auth.id,
      });
      const user = await User.findById(req.auth.id);
      console.log(user);
      user.orders.push(newOrder.id);
      await user.save();

      res.json(newOrder);
    } else {
      console.log("Quantity is higher than stock. Order denied.");
      res
        .status(400)
        .json({ message: "La cantidad supera el stock disponible" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function show(req, res) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function destroy(req, res) {
  try {
    const orderId = req.params.id;
    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.status(200).json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function update(req, res) {
  try {
    const orderId = req.params.id;
    console.log(orderId);
    const order = await Order.findOneAndUpdate(
      { id: orderId },
      {
        $set: {
          address: req.body.address,
          status: req.body.status,
          products: req.body.products,
          totalPrice: req.body.totalPrice,
        },
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    console.log(order);
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  index,
  show,
  store,
  destroy,
  update,
};
