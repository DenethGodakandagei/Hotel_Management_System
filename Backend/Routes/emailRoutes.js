import express from "express";
import emailController from "../Controller/emailController.js";

const router = express.Router();

router.post("/", emailController)

export default router;