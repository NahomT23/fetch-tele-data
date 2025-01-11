// controllers/paymentController.js
import * as paymentService from "../services/paymentService.js";

// Create a Stripe Checkout session
export const createCheckoutSession = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items provided for checkout" });
    }

    const session = await paymentService.createCheckoutSession(items);

    res.status(201).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};
