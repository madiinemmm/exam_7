import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products.slice(0, 10));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleProductClick = (id) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="fixed top-0 left-0 w-full h-full object-cover">
        <source
          src="../../public/8447605-uhd_4096_2160_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              className="card glass w-full p-2 max-w-xs mx-auto my-4 rounded-lg overflow-hidden shadow-2xl"
              key={product.id}>
              <Link
                to={`/product/${product.id}`}
                onClick={() => handleProductClick(product.id)}>
                <figure className="relative w-full h-48">
                  <img
                    className="absolute inset-0 w-[200px] h-[180px] ml-auto mr-auto object-cover"
                    src={product.thumbnail}
                    alt={product.title}
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="text-lg font-bold truncate">
                    {product.title}
                  </h2>
                  <p className="text-purple-900 font-semibold">
                    Price: ${product.price}
                  </p>
                  <div className="mt-2">
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
                      Learn More
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
