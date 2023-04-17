const { mongoose, Schema } = require("../db");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    address: String,
    photo: String,
    isAdmin: { type: Boolean, default: false },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("insertMany", async function (next, users) {
  for (const user of users) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  return next();
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  return next();
});

// Metodo para comparar la constraseña una vez istanciado el modelo de user.
userSchema.methods.passwordCheck = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Metodo para que no se envie la contraseña desde el res.json cuando mandamos un usuario.
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  user.id = user._id.toString();
  delete user.password;
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
