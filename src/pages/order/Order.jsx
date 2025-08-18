import React, { useContext } from "react";
import { motion } from "framer-motion";
import myContext from "../../context/data/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

function Order() {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const userid = currentUser?.user?.uid || null;

  const { mode, loading, order } = useContext(myContext);

  // ✅ Animation Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <Layout>
      {loading && <Loader />}

      {order.length > 0 ? (
        <div
          className={`min-h-screen px-4 py-10 transition-colors duration-500 ${
            mode === "dark"
              ? "bg-gradient-to-br from-gray-900 via-black to-gray-800"
              : "bg-white"
          }`}
        >
          <h1
            className={`text-center text-3xl md:text-5xl font-extrabold tracking-wider drop-shadow-lg transition-colors duration-500 ${
              mode === "dark"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
                : "text-gray-800"
            }`}
          >
            Your Orders
          </h1>

          <div className="mt-10 space-y-8 max-w-5xl mx-auto">
            {order
              .filter((obj) => obj.userid === userid)
              .map((order, orderIndex) => (
                <motion.div
                  key={orderIndex}
                  className={`p-6 rounded-2xl shadow-2xl border transition-colors duration-500 ${
                    mode === "dark"
                      ? "border-gray-700 bg-white/10 backdrop-blur-lg"
                      : "border-gray-200 bg-gray-50"
                  }`}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  custom={orderIndex}
                >
                  <h2
                    className={`text-xl font-semibold mb-4 ${
                      mode === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Order #{orderIndex + 1}
                  </h2>

                  <div className="grid gap-6 md:grid-cols-2">
                    {order.cartItems.map((item, i) => (
                      <motion.div
                        key={i}
                        className={`flex items-start gap-4 rounded-xl p-4 border transition-colors duration-500 hover:scale-[1.02] transform-gpu ${
                          mode === "dark"
                            ? "border-gray-600 bg-gradient-to-tr from-gray-800/80 to-gray-700/40"
                            : "border-gray-200 bg-white"
                        }`}
                        custom={i}
                        variants={cardVariants}
                      >
                        <motion.img
                          src={item.imageURL}
                          alt={item.title}
                          className="w-28 h-28 object-cover rounded-xl border border-gray-300"
                          whileHover={{ scale: 1.1, rotate: 2 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        />

                        <div className="flex-1">
                          <h3
                            className={`text-lg font-bold ${
                              mode === "dark" ? "text-purple-400" : "text-gray-800"
                            }`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm mt-1 line-clamp-2 ${
                              mode === "dark" ? "text-gray-300" : "text-gray-600"
                            }`}
                          >
                            {item.description}
                          </p>
                          <p
                            className={`text-md font-semibold mt-2 ${
                              mode === "dark" ? "text-pink-400" : "text-green-600"
                            }`}
                          >
                            ₹ {item.price}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      ) : (
        <div
          className={`flex justify-center items-center min-h-screen transition-colors duration-500 ${
            mode === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          <motion.h2
            className={`text-2xl md:text-4xl font-bold ${
              mode === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            🚀 No Orders Yet – Start Shopping!
          </motion.h2>
        </div>
      )}
    </Layout>
  );
}

export default Order;
