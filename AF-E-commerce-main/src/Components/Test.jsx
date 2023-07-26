import React, { useState } from 'react';

const Test = () => {
  const [orderId, setOrderId] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [signature, setSignature] = useState('');

  const createOrder = async () => {
    try {
      const response = await fetch('/custom/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) // Set the desired amount
      });

      const order = await response.json();
      setOrderId(order.id);
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const verifyPayment = async () => {
    try {
      const response = await fetch('/custom/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature })
      });

      const verificationResult = await response.json();
      // Handle the payment verification result on the frontend
      console.log(verificationResult)
    } catch (error) {
        
      console.error('Error verifying payment:', error);
    }
  };

  return (
    <div>
      <button onClick={createOrder}>Create Order</button>
      <input type="text" placeholder="Payment ID" value={paymentId} onChange={(e) => setPaymentId(e.target.value)} />
      <input type="text" placeholder="Signature" value={signature} onChange={(e) => setSignature(e.target.value)} />
      <button onClick={verifyPayment}>Verify Payment</button>
    </div>
  );
};

export default Test;