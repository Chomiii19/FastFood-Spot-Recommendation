import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    validate: [validator.isEmail, "Enter a valid email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password mismatch"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Password mismatch",
    },
  },
  locatedAt: {
    type: [Number],
  },
});

userSchema.pre("save", async (next) => {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("users", userSchema);

export default User;
