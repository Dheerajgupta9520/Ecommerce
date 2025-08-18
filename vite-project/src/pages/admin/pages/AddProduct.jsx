import React, { useContext } from "react";
import myContext from "../../../context/data/myContext";
import { motion } from "framer-motion";

function AddProduct() {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        className="bg-gray-900/70 backdrop-blur-md px-8 py-10 rounded-2xl border border-gray-700 shadow-lg w-[90%] sm:w-[28em]"
      >
        <h1 className="text-center text-white text-2xl mb-6 font-bold tracking-wide">
          Add Product
        </h1>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={products.title}
          onChange={(e) => setProducts({ ...products, title: e.target.value })}
          className="mb-4 px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
          placeholder="Product title"
        />

        {/* Price */}
        <input
          type="text"
          name="price"
          value={products.price}
          onChange={(e) => setProducts({ ...products, price: e.target.value })}
          className="mb-4 px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
          placeholder="Product price"
        />

        {/* Image URL */}
        <input
          type="text"
          name="imageurl"
          value={products.imageURL}
          onChange={(e) => setProducts({ ...products, imageURL: e.target.value })}
          className="mb-4 px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
          placeholder="Product imageUrl"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          value={products.category}
          onChange={(e) => setProducts({ ...products, category: e.target.value })}
          className="mb-4 px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 transition"
          placeholder="Product category"
        />

        {/* Description */}
        <textarea
          cols="30"
          rows="5"
          name="description"
          value={products.description}
          onChange={(e) =>
            setProducts({ ...products, description: e.target.value })
          }
          className="mb-4 px-3 py-2 w-full rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 outline-none placeholder-gray-400 transition resize-none"
          placeholder="Product description"
        />

        {/* Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={addProduct}
            className="w-full bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition"
          >
            Add Product
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddProduct;
