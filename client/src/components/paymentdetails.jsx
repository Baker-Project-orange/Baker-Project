import React, { useState } from "react";
import PayPalButton from "./pyamentbutton";

const PaymentDetails = ({ onPaymentMethodChange = () => {} }) => {
  const [paymentMethod, setPaymentMethod] = useState("net");
  const [cards, setCards] = useState([
    { id: 1, type: "visa", last4: "0981", expires: "10/19" },
    { id: 2, type: "mastercard", last4: "2564", expires: "10/19" },
  ]);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [newCard, setNewCard] = useState({
    type: "visa",
    number: "",
    expires: "",
  });

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    onPaymentMethodChange(method);
  };

  const handleAddNewCard = (e) => {
    e.preventDefault();
    const last4 = newCard.number.slice(-4);
    const cardToAdd = {
      id: cards.length + 1,
      type: newCard.type,
      last4: last4,
      expires: newCard.expires,
    };
    setCards([...cards, cardToAdd]);
    setShowNewCardForm(false);
    setNewCard({ type: "visa", number: "", expires: "" });
  };

  return (
    <div className="p-4">
      {/* <h2 className="text-xl font-bold mb-4">Payment Details</h2> */}

      {/* <div className="flex space-x-4 mb-4 accent-pink-600">
        {["net", "cash"].map((method) => (
          <label key={method} className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={() => handlePaymentMethodChange(method)}
              className="mr-2"
            />
            {method === "net" ? "Net Banking" : "Cash on delivery"}
          </label>
        ))}
      </div> */}

      {/* {paymentMethod === "net" && <PayPalButton amount={30} />} */}

      {showNewCardForm && (
        <form
          onSubmit={handleAddNewCard}
          className="mt-4 p-4 bg-gray-100 rounded-lg"
        >
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Card Type
            </label>
            <select
              value={newCard.type}
              onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
            </select>
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              value={newCard.number}
              onChange={(e) =>
                setNewCard({ ...newCard, number: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Expiration Date
            </label>
            <input
              type="text"
              value={newCard.expires}
              onChange={(e) =>
                setNewCard({ ...newCard, expires: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="MM/YY"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-md"
          >
            Add Card
          </button>
        </form>
      )}
    </div>
  );
};

export default PaymentDetails;
