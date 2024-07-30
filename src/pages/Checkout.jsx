import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsToRemove, setItemsToRemove] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const newQuantities = savedCart.reduce((acc, item) => {
      acc[item.title] = (acc[item.title] || 0) + 1;
      return acc;
    }, {});
    setQuantities(newQuantities);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleQuantityChange = (title, delta) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[title] || 1) + delta;
      return {
        ...prevQuantities,
        [title]: newQuantity > 0 ? newQuantity : 1,
      };
    });
  };

  const handleRemoveSelected = () => {
    setItemsToRemove(selectedItems);
    setShowModal(true);
  };

  const handleDelete = () => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => !itemsToRemove.includes(item.title)
      );
      const updatedQuantities = updatedCart.reduce((acc, item) => {
        acc[item.title] = (acc[item.title] || 0) + 1;
        return acc;
      }, {});
      setQuantities(updatedQuantities);
      setSelectedItems([]);
      setItemsToRemove([]);
      setSelectAll(false);
      toast.success("Selected products removed from cart");
      return updatedCart;
    });
    setShowModal(false);
  };

  const handleSelect = (title) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((item) => item !== title)
        : [...prevSelected, title]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setItemsToRemove([]);
    } else {
      const allTitles = aggregatedItems.map((item) => item.title);
      setSelectedItems(allTitles);
      setItemsToRemove(allTitles);
    }
    setSelectAll(!selectAll);
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    navigate("/contact");
  };

  const aggregatedItems = Object.keys(quantities).map((title) => {
    const item = cart.find((product) => product.title === title);
    return { ...item, quantity: quantities[title] };
  });

  const total = aggregatedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = aggregatedItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <div className="p-6 relative max-w-4xl mt-20 mx-auto bg-white rounded-lg shadow-md">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover ">
        <source
          src="../../public/5363219-uhd_3840_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <h1 className="text-2xl font-bold relative mb-6">Checkout</h1>
      <div className="space-y-4 relative p-8 glass">
        {cart.length === 0 ? (
          <p>No products in the cart.</p>
        ) : (
          aggregatedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 border p-4 rounded-lg shadow-sm">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.title)}
                onChange={() => handleSelect(item.title)}
                className="mr-2"
              />
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-lg font-bold">Price: ${item.price}</p>
                <p className="text-lg font-bold">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between mt-6 relative">
        <button
          onClick={handleCheckout}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Checkout
        </button>
        {selectedItems.length > 0 && (
          <button
            onClick={handleRemoveSelected}
            className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
            Remove Selected
          </button>
        )}
      </div>

      {showModal && (
        <div className="fixed glass inset-0 mt-20 bg-opacity-75 flex justify-center items-center">
          <div className="glass bg-inherit p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Remove Selected Items</h2>
            <p className="text-lg font-semibold mb-2">
              <strong>Total Price:</strong> ${total.toFixed(2)}
            </p>
            <p className="text-lg font-semibold mb-4">
              <strong>Total Items:</strong> {totalItems}
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="mr-2"
              />
              <label className="text-lg font-semibold">Select All</label>
            </div>
            <div className="space-y-4 mb-4">
              {aggregatedItems
                .filter((item) => selectedItems.includes(item.title))
                .map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 border p-4 rounded-lg shadow-sm">
                    <input
                      type="checkbox"
                      checked={itemsToRemove.includes(item.title)}
                      onChange={() =>
                        setItemsToRemove((prev) =>
                          prev.includes(item.title)
                            ? prev.filter((title) => title !== item.title)
                            : [...prev, item.title]
                        )
                      }
                      className="mr-2"
                    />
                    <img
                      src={item.image || "https://via.placeholder.com/150"}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-lg font-bold">Price: ${item.price}</p>
                      <p className="text-lg font-bold">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                Confirm Removal
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
