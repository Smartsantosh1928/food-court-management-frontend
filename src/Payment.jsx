import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import { Button } from "@material-tailwind/react";

export default function Payment() {
  const [Razorpay] = useRazorpay();

    
  const handlePayment = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/payment/createOrderId/100', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const orderId = await response.text();
        console.log(orderId);
        const options = {
          key: 'rzp_test_sPOK9AomtuSB9w',
          amount: "100",
          currency: "INR",
          name: "Tech Behind Us",
          description: "Test Transaction",
          image: "https://i.ibb.co/wQHSP5R/3224f4b4-2343-46b3-9640-61e4a6b25ebc-5b6387137939806117b881333b809e3f-png.jpg",
          order_id: orderId,
          handler: (res) => {
            console.log(res);
          },
          prefill: {
            name: "Santosh",
            email: "smartsantosh1928@gmail.com",
            contact: "9489770245",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          }
        }
          const rzpay = new Razorpay(options);
          rzpay.open();
        } else {
          console.error('Failed to create Razorpay order:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }, [Razorpay]);


  return (
    <div className="App">
      <Button onClick={handlePayment}>Click</Button>
    </div>
  );
}