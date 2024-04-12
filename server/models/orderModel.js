import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
   
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
      },
    ],
    userName: {
      type: String,
      required: true,
    },
    // You can add other fields such as user ID, order status, etc.
    status: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    // Timestamps
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
