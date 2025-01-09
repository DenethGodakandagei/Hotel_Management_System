// src/config/StripeConfig.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);  //Stripe Secret Key

export default stripe;
