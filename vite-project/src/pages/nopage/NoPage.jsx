import React from "react";
import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export default function Nopage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full"
      >
        {/* Icon animation */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center mb-6"
        >
          <Hammer className="w-20 h-20 text-yellow-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl font-bold text-gray-800 dark:text-white mb-4"
        >
          🚧 We’re Working on This Page
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
        >
          This section is under construction. Please check back later!
        </motion.p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 rounded-xl cursor-pointer bg-blue-600 text-white text-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Home
        </motion.button>
      </motion.div>
    </div>
  );
}
