import React, { useContext, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import myContext from "../../context/data/myContext";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { mode, toggleMode } = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Mobile Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={`relative w-full max-w-xs flex flex-col bg-white dark:bg-gray-900 shadow-xl`}
              >
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Menu
                  </h2>
                  <button
                    type="button"
                    className="p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 size={22} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 px-6 py-4">
                  <Link to="/" className="nav-link" onClick={() => setOpen(false)}>Home</Link>
                  <Link to="/allproducts" className="nav-link" onClick={() => setOpen(false)}>All Products</Link>
                  {user && <Link to="/order" className="nav-link" onClick={() => setOpen(false)}>Orders</Link>}
                  {user?.user?.email === "dheeraj109gupta@gmail.com" && (
                    <Link to="/dashboard" className="nav-link" onClick={() => setOpen(false)}>Admin</Link>
                  )}
                  {user ? (
                    <span className="nav-link cursor-pointer" onClick={logout}>Logout</span>
                  ) : (
                    <Link to="/login" className="nav-link" onClick={() => setOpen(false)}>Login</Link>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Top Banner */}
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex h-10 items-center justify-center bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-medium"
      >
        🚚 Free delivery on orders over ₹499
      </motion.p>

      {/* Main Navbar */}
      <header
        className={`shadow-md transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <nav className="px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center">
              <motion.h1
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold tracking-wide"
              >
                E-Bharat
              </motion.h1>
            </Link>

            {/* Right: Nav Items */}
            <div className="hidden lg:flex items-center gap-8">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/" className="nav-link">Home</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/allproducts" className="nav-link">All Products</Link>
              </motion.div>
              {user && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/order" className="nav-link">Orders</Link>
                </motion.div>
              )}
              {user?.user?.email === "dheeraj109gupta@gmail.com" && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/dashboard" className="nav-link">Admin</Link>
                </motion.div>
              )}
              {user ? (
                <motion.span whileHover={{ scale: 1.05 }} className="nav-link cursor-pointer" onClick={logout}>
                  Logout
                </motion.span>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/login" className="nav-link">Login</Link>
                </motion.div>
              )}
            </div>

            {/* Right: Icons */}
            <div className="flex items-center gap-6">
              {/* Dark/Light Toggle */}
              <motion.button
                whileTap={{ rotate: 180 }}
                onClick={toggleMode}
                className="p-2"
              >
                {mode === "light" ? <FiSun size={22} /> : <BsFillCloudSunFill size={22} />}
              </motion.button>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link to="/cart" className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h14l-1.5 6H8.5L7 13zm0 0L5 6h16l-2 7H7z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full px-2"
                    >
                      {cartItems.length}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
