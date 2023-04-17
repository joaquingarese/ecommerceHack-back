const { mongoose, Schema } = require("../db");
const bcrypt = require("bcryptjs");

const adminSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

adminSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  return next();
});

// Metodo para comparar la constraseña una vez istanciado el modelo de admin.
adminSchema.methods.passwordCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Metodo para que no se envie la contraseña desde el res.json cuando mandamos un usuario.
adminSchema.methods.toJSON = function () {
  const admin = this.toObject();
  admin.id = admin._id.toString();
  delete admin.password;
  return admin;
};

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
