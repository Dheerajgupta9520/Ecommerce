import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ShoppingCart,
} from "lucide-react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-6 md:px-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link to="/" className="text-3xl font-extrabold tracking-wide">
            E-Bharat
          </Link>
          <p className="mt-4 text-gray-400 text-sm leading-relaxed">
            Shop smarter, faster, and safer. E-Bharat brings the marketplace to
            your fingertips.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-white transition">
                Order
              </Link>
            </li>
            <li>
              <Link to="/local" className="hover:text-white transition">
                Local For Vocal
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-white transition flex items-center gap-1"
              >
                <ShoppingCart size={16} /> Cart
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-3 text-gray-300">
            <li>
              <Link to="/returnpolicy" className="hover:text-white transition">
                Return Policy
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacypolicy" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe to get offers, updates and exclusive deals.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded-l-lg bg-gray-800 text-white text-sm focus:outline-none w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-violet-600 rounded-r-lg hover:bg-violet-700 transition"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">
          © 2025 E-Bharat. All rights reserved.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.2 }}
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
