import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("An error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover ">
        <source
          src="../../public/8447605-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="flex mt-44 w-[80%] ml-auto mr-auto p-10 glass h-[80%] shadow-2xl">
        <Link to="/">
          {" "}
          <h1 className="flex hover:text-gray-600 transition-all duration-600 ">
            {" "}
            <IoChevronBack className="mt-1.5" />
            Back
          </h1>
        </Link>
        <div>
          <img
            className="w-[300px]  mt-5"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="flex gap-10">
          <div className="w-[300px]">
            <h1 className="font-bold text-2xl text-purple-900">
              {product.title}
            </h1>
            <p className="font-semibold text-gray-900 text-[18px]">
              {product.description}
            </p>
          </div>
          <div className="font-semibold text-[18px]">
            <p className="mb-2">Price: ${product.price}</p>
            <p className="mb-2">Category: {product.category}</p>
            <p className="mb-2">
              Discount Percentage: {product.discountPercentage}
            </p>
            <p className="mb-2">Rating {product.rating}</p>
            <p>Brand: {product.brand}</p>
            <p className="mb-2">SKU: {product.sku}</p>
          </div>
          <div className="font-semibold text-[18px]">
            <p className="mb-2">Width: {product.dimensions.width}</p>
            <p className="mb-2">Height: {product.dimensions.height}</p>
            <p className="mb-2">Depth: {product.dimensions.depth}</p>
            <p className="mb-2">
              Warranty Information: {product.warrantyInformation}
            </p>
            <p>Shipping Information: {product.shippingInformation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
