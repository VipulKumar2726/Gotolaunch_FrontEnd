import React from "react";
import loadRazorpay from "../utils/loadRazorpay";
import { createOrder } from "../services/paymentService";

const Checkout = () => {

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // create order from backend
    const { data } = await createOrder(499); // ₹499

    const options = {
      key: "YOUR_KEY_ID",
      amount: data.order.amount,
      currency: "INR",
      name: "Launch App",
      description: "Upgrade Plan",
      order_id: data.order.id,

      handler: function (response) {
        console.log("Payment Success:", response);
      },

      prefill: {
        name: "Vipul Kumar",
        email: "test@gmail.com",
      },

      theme: {
        color: "#1976d2",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;