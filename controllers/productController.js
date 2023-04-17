const { Product, Category } = require("../models");
const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const formidable = require("formidable");
const form = formidable({
  multiples: true,
  keepExtensions: true,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY
);

async function index(req, res) {
  try {
    const products = await Product.find({}).populate("category");

    if (!products) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function show(req, res) {
  try {
    const slug = req.params.slug;
    const [product] = await Product.find({ slug: slug }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function store(req, res) {
  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res
          .status(400)
          .json({ message: "Error al procesar el formulario" });
      }

      const ext = path.extname(files.photo.filepath);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(
          files.photo.newFilename,
          fs.createReadStream(files.photo.filepath),
          {
            cacheControl: "3600",
            upsert: false,
            contentType: files.photo.mimetype,
            duplex: "half",
          }
        );

      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al subir la imagen" });
      }

      const newProduct = await Product.create({
        name: fields.name,
        description: fields.description,
        category: fields.category,
        photo:
          "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/" +
          files.photo.newFilename,
        price: fields.price,
        stock: fields.stock,
        featured: fields.featured,
        slug: fields.name,
      });

      res.send("newProduct");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function destroy(req, res) {
  try {
    const productSlug = req.params.slug;
    const deleted = await Product.findOneAndDelete({ slug: productSlug });

    if (!deleted) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json("OK");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function update(req, res) {
  try {
    const slug = req.params.slug;
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (files.photo !== undefined) {
        const ext = path.extname(files.photo.filepath);
        const { data, error } = await supabase.storage
          .from("images")
          .upload(
            files.photo.newFilename,
            fs.createReadStream(files.photo.filepath),
            {
              cacheControl: "3600",
              upsert: false,
              contentType: files.photo.mimetype,
              duplex: "half",
            }
          );

        const product = await Product.findOneAndUpdate(
          { slug: slug },
          {
            $set: {
              name: fields.name,
              description: fields.description,
              category: fields.category,
              photo:
                "https://iazyuszdrivuimeywxju.supabase.co/storage/v1/object/public/images/" +
                files.photo.newFilename,
              price: fields.price,
              stock: fields.number,
              featured: fields.featured,
              slug: fields.slug,
            },
          },
          { new: true }
        );
      } else {
        const product = await Product.findOneAndUpdate(
          { slug: slug },
          {
            $set: {
              name: fields.name,
              description: fields.description,
              category: fields.category,
              price: fields.price,
              stock: fields.number,
              featured: fields.featured,
              slug: fields.slug,
            },
          },
          { new: true }
        );
      }
    });

    return res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  index,
  show,
  store,
  destroy,
  update,
};
