import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(user._id);

  res.status(201).json({
    status: "Success",
    data: user,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new AppError("Please fill out the fields.", 400));

  const user = await User.findOne({ username });

  if (!user)
    return next(new AppError("No account belongs to this username.", 404));

  if (!user.comparePassword(password))
    return next(new AppError("Incorrect password.", 400));

  const token = signToken(user._id);

  res.status(200).json({
    status: "Success",
    data: user,
  });
});

export { signup, login };
