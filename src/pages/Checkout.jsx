import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loadRazorpay from "../utils/loadRazorpay";
import { createOrder } from "../api/paymentService";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  const planDetails = {
    basic: { name: 'Basic', price: 0 },
    standard: { name: 'Standard', price: 29 }, // in USD, but we'll use INR equivalent
    premium: { name: 'Premium', price: 49 },
  };

  const currentPlan = planDetails[plan];

  useEffect(() => {
    if (plan === 'basic') {
      // For free plan, activate and redirect
      alert('Basic plan activated successfully!');
      navigate('/app');
    }
  }, [plan, navigate]);

  const handlePayment = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // Amount in rupees (backend expects rupees, converts to paise)
    const amount = currentPlan.price * 83; // Approximate USD to INR conversion

    // create order from backend
    const { data } = await createOrder(amount);

    const options = {
      key: "rzp_test_SZt2DKNK7IKOti",
      amount: data.order.amount,
      currency: "INR",
      name: "Launch App",
      description: `Upgrade to ${currentPlan.name} Plan`,
      order_id: data.order.id,

      handler: function (response) {
        console.log("Payment Success:", response);
        alert('Payment successful! Plan upgraded.');
        navigate('/app');
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

  if (!plan || !currentPlan) {
    return <div>Invalid plan selected.</div>;
  }

  if (plan === 'basic') {
    return <div>Activating free plan...</div>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Checkout - {currentPlan.name} Plan</h2>
      <p>Price: ₹{currentPlan.price * 83}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;