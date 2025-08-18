import React, { useContext } from "react";
import myContext from "../../../context/data/myContext";
import { motion } from "framer-motion";

function UpdateProduct() {
  const context = useContext(myContext);
  const { products, setProducts, updateProduct } = context;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 },
    },
    exit: { opacity: 0, y: -50, scale: 0.95 },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (i = 0) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Neon grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.15),transparent_60%)] pointer-events-none" />
      <motion.div
        className="relative bg-gray-800/40 backdrop-blur-xl px-10 py-10 rounded-2xl shadow-[0_0_25px_rgba(0,255,255,0.4)] border border-cyan-400/40 w-[90%] md:w-[28em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1 className="text-center text-cyan-300 text-3xl mb-6 font-extrabold tracking-wide drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
          ⚡ Update Product
        </h1>

        {/* Title */}
        <motion.input
          type="text"
          name="title"
          value={products.title}
          onChange={(e) => setProducts({ ...products, title: e.target.value })}
          placeholder="Product Title"
          className="bg-gray-900/50 border border-cyan-400/30 focus:border-cyan-300 text-cyan-100 mb-4 px-4 py-2 w-full rounded-lg placeholder:text-gray-400 outline-none shadow-inner"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        />

        {/* Price */}
        <motion.input
          type="text"
          name="price"
          value={products.price}
          onChange={(e) => setProducts({ ...products, price: e.target.value })}
          placeholder="Product Price"
          className="bg-gray-900/50 border border-cyan-400/30 focus:border-cyan-300 text-cyan-100 mb-4 px-4 py-2 w-full rounded-lg placeholder:text-gray-400 outline-none shadow-inner"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        />

        {/* Image URL */}
        <motion.input
          type="text"
          name="imageurl"
          value={products.imageurl}
          onChange={(e) =>
            setProducts({ ...products, imageurl: e.target.value })
          }
          placeholder="Product Image URL"
          className="bg-gray-900/50 border border-cyan-400/30 focus:border-cyan-300 text-cyan-100 mb-4 px-4 py-2 w-full rounded-lg placeholder:text-gray-400 outline-none shadow-inner"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        />

        {/* Category */}
        <motion.input
          type="text"
          name="category"
          value={products.category}
          onChange={(e) =>
            setProducts({ ...products, category: e.target.value })
          }
          placeholder="Product Category"
          className="bg-gray-900/50 border border-cyan-400/30 focus:border-cyan-300 text-cyan-100 mb-4 px-4 py-2 w-full rounded-lg placeholder:text-gray-400 outline-none shadow-inner"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={4}
        />

        {/* Description */}
        <motion.textarea
          cols="30"
          rows="4"
          name="decription"
          value={products.decription}
          onChange={(e) =>
            setProducts({ ...products, decription: e.target.value })
          }
          placeholder="Product Description"
          className="bg-gray-900/50 border border-cyan-400/30 focus:border-cyan-300 text-cyan-100 mb-4 px-4 py-2 w-full rounded-lg placeholder:text-gray-400 outline-none shadow-inner resize-none"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={5}
        />

        {/* Button */}
        <motion.div
          className="flex justify-center"
          variants={inputVariants}
          initial="hidden"
          animate="visible"
          custom={6}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0,255,255,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={updateProduct}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 w-full text-black font-bold px-4 py-2 rounded-lg shadow-md hover:from-cyan-300 hover:to-blue-400 transition-all"
          >
            🚀 Update Product
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default UpdateProduct;
