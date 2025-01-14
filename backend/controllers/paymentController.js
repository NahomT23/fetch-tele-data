import { createStripeSession } from "../services/itemService.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const session = await createStripeSession(req.body.items);
    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

