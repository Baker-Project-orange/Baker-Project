// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// function PayPalButton({ amount }) {
//   const createOrder = (data, actions) => {
//     return actions.order.create({
//       purchase_units: [
//         {
//           amount: {
//             value: 49.95,
//           },
//           name: {
//             value: "From Oven to Door",
//           },
//         },
//       ],
//     });
//   };

//   const onApprove = (data, actions) => {
//     return actions.order.capture().then(function (details) {
//       // Send the payment details to your server
//       fetch("http://localhost:3000/api/complete-payment", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderID: data.orderID,
//           payerID: data.payerID,
//           paymentID: details.id,
//         }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.success) {
//             console.log("Payment successful!", data);
//           } else {
//             console.error("Payment verification failed:", data.error);
//           }
//         })
//         .catch((error) =>
//           console.error("Error communicating with the server:", error)
//         );
//     });
//   };

//   return (
//     <PayPalScriptProvider
//       options={{
//         "client-id":
//           "AaNKdFSya2nFjcnY-ovYES--3uDl6E6fS9Fz4SpNsX0iAvMg_m0PIoQT2SJsw_NUXN4QAikbdDXJqRZE",
//       }}
//     >
//       <PayPalButtons
//         createOrder={createOrder}
//         onApprove={onApprove}
//         onError={(err) => console.error("PayPal Button Error:", err)}
//       />
//     </PayPalScriptProvider>
//   );
// }

// export default PayPalButton;


import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

function PayPalButton({ amount }) {
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
          name: {
            value: "From Oven to Door",
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      // Show SweetAlert
      Swal.fire({
        title: "Thank you!",
        text: "Your payment was successful.",
        icon: "success",
        confirmButtonColor: "#c98d83",
      });

      // Send the payment details to your server
      fetch("http://localhost:3000/api/complete-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: data.orderID,
          payerID: data.payerID,
          paymentID: details.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Payment successful!", data);
          } else {
            console.error("Payment verification failed:", data.error);
          }
        })
        .catch((error) =>
          console.error("Error communicating with the server:", error)
        );
    });
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AaNKdFSya2nFjcnY-ovYES--3uDl6E6fS9Fz4SpNsX0iAvMg_m0PIoQT2SJsw_NUXN4QAikbdDXJqRZE",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(err) => console.error("PayPal Button Error:", err)}
      />
    </PayPalScriptProvider>
  );
}

export default PayPalButton;