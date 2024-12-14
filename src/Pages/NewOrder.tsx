import React, { useState, ChangeEvent, FormEvent } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";

const apiurl = import.meta.env.VITE_API_URL;

const OrderForm = () => {
  const [customerData, setCustomerData] = useState({
    fulfillment_status: "pending",
    payment_status: "pending",
    order_number: "",
    email: "",
    billing_address: "",
    shipping_address: "",
    tracking_number: "",
    total_price: "",
    subtotal_price: "",
    shipping_price: "",
    tax_price: "",
    discount_price: "",
    note: "",
    tags: "",
  });

  const [paymentStatus, setPaymentStatus] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      ...customerData,
      payment_status: paymentStatus
    };

    // Print the payload to the console
    console.log("Payload being sent:", payload);

    try {
      const response = await fetch(`${apiurl}store/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Order created successfully:", data);
      } else {
        console.error("Failed to create order:", response.status, response.statusText);
        const errorData = await response.json();
        console.error("Error details:", errorData);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }

    // Reset form data
    setCustomerData({
      fulfillment_status: "pending",
      payment_status: "pending",
      order_number: "",
      email: "",
      billing_address: "",
      shipping_address: "",
      tracking_number: "",
      total_price: "",
      subtotal_price: "",
      shipping_price: "",
      tax_price: "",
      discount_price: "",
      note: "",
      tags: "",
    });
    setPaymentStatus("");
  };

  return (
    <section className="sm:px-5 pb-24">
      <div className="flex justify-center">
        <div className="py-8 w-2/5">
          <h1 className="flex text-lg font-bold items-center">
            <span className="p-[6px] hover:bg-[#D4D4D4] mr-2 rounded-lg cursor-pointer">
              <Link to={"/order"}>
                <MdArrowBack />
              </Link>
            </span>
            Create Order
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col xl:flex-row justify-center gap-4">
        <div className="w-full xl:w-2/5 space-y-4 m-auto md:m-0">
          <div className="bg-white shadow-lg sm:rounded-lg px-4 py-2 pb-10 border space-y-4">
            <h1 className="font-bold text-base pb-2">Customer Information</h1>
            {[
              { name: "customer", label: "Customer ID*", placeholder: "Enter customer ID" },
              { name: "email", label: "Email*", placeholder: "Enter customer email" },
              { name: "firstName", label: "First Name*", placeholder: "Enter first name" },
              { name: "lastName", label: "Last Name", placeholder: "Enter last name" },
              { name: "billing_address", label: "Billing Address", placeholder: "Enter billing address" },
              { name: "shipping_address", label: "Shipping Address", placeholder: "Enter shipping address" },
              { name: "tracking_number", label: "Tracking Number", placeholder: "Enter tracking number" }
            ].map(({ name, label, placeholder }) => (
              <div key={name} className="flex flex-col space-y-1">
                <label htmlFor={name}>{label}</label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={customerData[name as keyof typeof customerData]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="border border-black rounded-md p-2 w-full"
                />
              </div>
            ))}

            <h1 className="font-bold text-base pb-2">Order Details</h1>
            {[
              { name: "order_number", label: "Order Number", placeholder: "Enter order number" },
              { name: "note", label: "Note", placeholder: "Add any notes" }
            ].map(({ name, label, placeholder }) => (
              <div key={name} className="flex flex-col space-y-1">
                <label htmlFor={name}>{label}</label>
                <input
                  type="text"
                  id={name}
                  name={name}
                  value={customerData[name as keyof typeof customerData]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  className="border border-black rounded-md p-2 w-full"
                />
              </div>
            ))}

            <h1 className="font-bold text-base pb-2">Payment Status</h1>
            <select
              name="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="border border-black rounded-md p-2 w-full"
            >
              <option value="" disabled>Select payment status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="refunded">Refunded</option>
              <option value="partially_refunded">Partially Refunded</option>
            </select>
            <h1 className="font-bold text-base pb-2">Price Details</h1>
            <div className="flex flex-wrap gap-4 mt-4">
              {[
                { name: "total_price", label: "Total Price" },
                { name: "subtotal_price", label: "Subtotal Price" },
                { name: "shipping_price", label: "Shipping Price" },
                { name: "tax_price", label: "Tax Price" },
                { name: "discount_price", label: "Discount Price" }
              ].map(({ name, label }) => (
                <div key={name} className="flex flex-col space-y-1 w-full sm:w-[48%]">
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    value={customerData[name as keyof typeof customerData]}
                    onChange={handleInputChange}
                    className="border border-black rounded-md p-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default OrderForm;