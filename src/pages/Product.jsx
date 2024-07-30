import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddSharp } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Product() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    image: "",
    weight: "",
    scent: "",
    preparation: "",
    shelfLife: "",
  });
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(savedProducts);
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [products, cart]);

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch(
        "https://api.unsplash.com/search/photos?client_id=nS0ZuWjRPItGjKojIhTKZfQi5O92kbah4bbgZY2Z2LU&page=10&query=perfume"
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const randomImage =
          data.results[Math.floor(Math.random() * data.results.length)].urls
            .small;
        setForm((prevForm) => ({
          ...prevForm,
          image: randomImage,
        }));
      } else {
        console.error("No images found");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setForm((prevForm) => ({
          ...prevForm,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProductIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editProductIndex ? form : product
      );
      setProducts(updatedProducts);
      toast.success("Product updated");
    } else {
      setProducts([...products, form]);
      toast.success("Product added");
    }
    setForm({
      title: "",
      description: "",
      price: "",
      brand: "",
      image: "",
      weight: "",
      scent: "",
      preparation: "",
      shelfLife: "",
    });
    setEditProductIndex(null);
    setImageFile(null);
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditProductIndex(index);
    setImageFile(null);
  };

  const handleDelete = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    toast.success("Product deleted");
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Product added to cart");
      return newCart;
    });
  };

  return (
    <div className="container mx-auto p-6 relative">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover">
        <source
          src="../../public/7793361-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10">
        <h1 className="text-3xl mt-2 ml-24 font-bold mb-6 text-gray-700">
          {editProductIndex !== null ? "Edit Product" : "Add Product"}
        </h1>
        <form
          className="glass p-8 w-[80%] ml-auto mr-auto h-[80%] rounded-lg shadow-lg mb-8"
          onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Or Upload Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Weight (grams)
              </label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Scent
              </label>
              <input
                type="text"
                name="scent"
                value={form.scent}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Preparation
              </label>
              <input
                type="text"
                name="preparation"
                value={form.preparation}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Shelf Life (months)
              </label>
              <input
                type="number"
                name="shelfLife"
                value={form.shelfLife}
                onChange={handleChange}
                className="w-full p-2 border bg-inherit outline-none border-black rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300">
            {editProductIndex !== null ? "Update Product" : "Add Product"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="border relative glass h-[100%] border-gray-200 rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.image || "/default-image.png"}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-900 mb-2">{product.description}</p>
                <p className="text-gray-900 font-semibold mb-2">
                  Price: ${product.price}
                </p>
                <p className="text-gray-900 mb-2">Brand: {product.brand}</p>
                <p className="text-gray-900 mb-2">
                  Weight: {product.weight ? `${product.weight} grams` : "N/A"}
                </p>
                <p className="text-gray-900 mb-2">
                  Scent: {product.scent || "N/A"}
                </p>
                <p className="text-gray-900 mb-2">
                  Preparation: {product.preparation || "N/A"}
                </p>
                <p className="text-gray-900 mb-4">
                  Shelf Life:{" "}
                  {product.shelfLife ? `${product.shelfLife} months` : "N/A"}
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-inherit border border-purple-700 font-bold text-2xl px-4 py-2 rounded-md text-purple-500 transition-transform transform duration-300 hover:scale-105 hover:shadow-lg">
                    <IoAddSharp />
                  </button>
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-inherit border border-green-700 font-bold text-2xl px-4 py-2 rounded-md text-green-500 transition-transform transform duration-300 hover:scale-105 hover:shadow-lg">
                    <FaRegEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-inherit border border-red-700 font-bold text-2xl px-4 py-2 rounded-md text-red-700 transition-transform transform duration-300 hover:scale-105 hover:shadow-lg">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
