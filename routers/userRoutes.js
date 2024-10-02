import express from "express";
import * as userAuthentication from "../controllers/userAuthentication.js";

const router = express.Router();

router.route("/signup", userAuthentication.signup);
router.route("/login", userAuthentication.login);

export default router;
