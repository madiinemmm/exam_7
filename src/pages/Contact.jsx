import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    cardNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    toast.success("Thank you for your order! We will get back to you soon.");

    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      cardNumber: "",
    });

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="mt-10 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover">
        <source
          src="../../public/5084552-uhd_4096_2160_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-2xl space-y-4 relative glass">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Address:</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Card Number:</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 w-full bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
