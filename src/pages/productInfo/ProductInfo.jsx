import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../firebase/FirebaseConfig";
import { motion } from "framer-motion";

// ⭐ Reusable star rating component
const Stars = ({ count = 4 }) => (
  <div className="flex">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        fill={i < count ? "currentColor" : "none"}
        stroke="currentColor"
        className={`w-4 h-4 ${i < count ? "text-indigo-500" : "text-gray-400"}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 
        1.18 6.88L12 17.77l-6.18 3.25L7 
        14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;

  const [product, setProduct] = useState(null);
  const params = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productSnap = await getDoc(doc(fireDB, "products", params.id));
      setProduct(productSnap.data());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart 🚀");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <section
        className={`body-font overflow-hidden min-h-screen transition-colors duration-500 
        ${mode === "dark" ? "bg-[#0f1115] text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="container px-5 py-12 mx-auto">
          {loading ? (
            <div className="text-center text-xl animate-pulse">Loading...</div>
          ) : (
            product && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:w-4/5 mx-auto flex flex-wrap rounded-2xl shadow-2xl 
                backdrop-blur-md p-6 
                bg-white/70 dark:bg-white/5"
              >
                {/* Product Image */}
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  alt={product.title}
                  className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded-xl shadow-md"
                  src={product.imageURL}
                />

                {/* Product Info */}
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h2 className="text-sm uppercase tracking-widest text-indigo-400">
                    Product
                  </h2>
                  <h1
                    className="text-4xl font-bold mb-2"
                    style={{
                      textShadow:
                        mode === "dark"
                          ? "0px 0px 10px rgba(129, 140, 248, 0.8)"
                          : "0px 0px 6px rgba(79, 70, 229, 0.5)",
                    }}
                  >
                    {product.title}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <Stars count={4} />
                    <span className="ml-3 text-sm opacity-70">4 Reviews</span>
                  </div>

                  {/* Description */}
                  <p
                    className={`leading-relaxed border-b pb-5 mb-5 ${
                      mode === "dark" ? "border-gray-700" : "border-gray-300"
                    }`}
                  >
                    {product.description}
                  </p>

                  {/* Price & Buttons */}
                  <div className="flex items-center">
                    <span
                      className="font-semibold text-3xl"
                      style={{
                        color:
                          mode === "dark"
                            ? "rgb(129,140,248)"
                            : "rgb(79,70,229)",
                        textShadow:
                          mode === "dark"
                            ? "0px 0px 12px rgba(129,140,248,0.9)"
                            : "0px 0px 8px rgba(79,70,229,0.5)",
                      }}
                    >
                      ₹{product.price}
                    </span>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addCart(product)}
                      className="ml-auto px-6 py-2 rounded-xl text-white bg-indigo-600 
                      hover:bg-indigo-700 transition shadow-lg"
                    >
                      Add To Cart
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 15 }}
                      className="ml-4 w-10 h-10 rounded-full flex items-center justify-center 
                      bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 shadow-md"
                    >
                      ❤️
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
