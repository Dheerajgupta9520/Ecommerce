import React, { useContext, useEffect, useState, useMemo } from "react";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletefromCart } from "../../redux/cartSlice";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ✅ for login redirect

function Cart() {
  const { mode } = useContext(myContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ✅ check if user is logged in
  const user = JSON.parse(localStorage.getItem("user"));

  // Calculate totals
  const totalAmount = useMemo(
    () => cartItems.reduce((sum, item) => sum + parseInt(item.price), 0),
    [cartItems]
  );
  const shipping = 100;
  const grandTotal = shipping + totalAmount;

  // Persist cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteCart = (item) => {
    dispatch(deletefromCart(item));
    toast.info(`Removed "${item.title}" from cart`);
  };

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error("All fields are required", { theme: "colored" });
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const options = {
      key: "rzp_test_R6UDluvF7XS0LG",
      key_secret: "9sQAqH4oisZLP1aoHvKlHGcI",
      amount: grandTotal * 100,
      currency: "INR",
      name: "E-Bharat",
      description: "Order Payment",
      handler: async (response) => {
        toast.success("Payment Successful");
        const orderInfo = {
          cartItems,
          addressInfo,
          paymentId: response.razorpay_payment_id,
          email: user?.user?.email,
          userid: user?.user?.uid,
          date: new Date().toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        };
        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
        } catch (error) {
          console.error(error);
        }
      },
      theme: { color: "#EC4899" },
    };

    new window.Razorpay(options).open();
  };

  return (
    <Layout>
      <div
        className={`min-h-screen pt-8 pb-16 px-4 ${
          mode === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-10">Your Cart</h1>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex flex-col sm:flex-row gap-4 p-5 rounded-2xl shadow-lg border ${
                      mode === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className="w-full sm:w-40 h-40 object-cover rounded-lg"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm opacity-75 mt-1">
                          {item.description}
                        </p>
                        <p className="text-pink-600 font-bold mt-2">
                          ₹{item.price}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteCart(item)}
                        className="mt-3 sm:mt-0 self-start sm:self-end text-red-500 hover:text-red-700 transition-colors"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <img
                    src="https://illustrations.popsy.co/gray/cart.svg"
                    alt="Empty cart"
                    className="w-40 mx-auto mb-6"
                  />
                  <p className="text-xl font-medium">Your cart is empty</p>
                  <p className="text-gray-500 mt-2">
                    Add some items to get started 🚀
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className={`w-full md:w-1/3 rounded-2xl shadow-lg border p-6 h-fit ${
                mode === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹{shipping}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>₹{grandTotal}</span>
              </div>

              {/* ✅ Show Buy Now if logged in else Login */}
              {user ? (
                <Modal
                  name={name}
                  address={address}
                  pincode={pincode}
                  phoneNumber={phoneNumber}
                  setName={setName}
                  setAddress={setAddress}
                  setPincode={setPincode}
                  setPhoneNumber={setPhoneNumber}
                  buyNow={buyNow}
                />
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition"
                >
                  Login to Continue
                </Link>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
