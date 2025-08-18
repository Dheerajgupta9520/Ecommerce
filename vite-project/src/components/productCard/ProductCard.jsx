import React, { useContext, useEffect, useMemo } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Helpers
const toStr = (v) => (v == null ? "" : String(v));
const lc = (v) => toStr(v).toLowerCase().trim();
const toNumber = (v) => {
  const s = toStr(v).replace(/[^0-9.]/g, "");
  return s ? Number(s) : NaN;
};

function ProductCard({ head = "Our Latest Collection" }) {
  const { mode, product = [], searchkey = "", filterType = "", filterPrice = "" } =
    useContext(myContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // --- Filtering ---
  const filteredProducts = useMemo(() => {
    const search = lc(searchkey);
    const type = lc(filterType);
    const priceFilter = toStr(filterPrice).trim();

    return product.filter((item) => {
      const title = lc(item?.title);
      const category = lc(item?.category);
      const priceNum = toNumber(item?.price);
      const priceStr = toStr(item?.price);

      const passTitle = search ? title.includes(search) : true;
      const passType = !type || type === "all" ? true : category.includes(type);
      const passPrice = priceFilter ? priceStr.includes(priceFilter) : true;

      return passTitle && passType && passPrice;
    });
  }, [product, searchkey, filterType, filterPrice]);

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    dispatch(addToCart(item));
    toast.success("Product added to cart");
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        {/* Section Header */}
        <div className="lg:w-1/2 w-full mb-8 text-center md:text-left">
          <h1
            className={`sm:text-3xl text-2xl font-semibold mb-2 ${
              mode === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {head}
          </h1>
          <div className="h-1 w-24 bg-pink-600 rounded mx-auto md:mx-0"></div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => {
              const { id, title, price, imageURL } = item || {};
              return (
                <div
                  key={id ?? index}
                  onClick={() => navigate(`/productinfo/${id}`)}
                  className={`border rounded-2xl overflow-hidden cursor-pointer 
                    shadow-sm hover:shadow-xl transition-all duration-300 
                    hover:-translate-y-2 group ${
                      mode === "dark"
                        ? "bg-gray-800 text-white border-gray-700"
                        : "bg-white text-gray-900 border-gray-200"
                    }`}
                >
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                      src={imageURL}
                      alt={title || "product"}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-xs uppercase tracking-widest text-gray-400">
                      E-Bharat
                    </h2>
                    <h1 className="title-font text-lg font-semibold mt-1">
                      {title}
                    </h1>
                    <p className="text-pink-600 font-bold mt-2">₹ {toStr(price)}</p>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => handleAddToCart(item, e)}
                      type="button"
                      className="mt-4 w-full py-2 text-sm font-medium rounded-lg
                        bg-pink-600 text-white hover:bg-pink-700
                        transition-colors duration-300 focus:ring-4 focus:ring-pink-300"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              className={`text-center w-full mt-6 ${
                mode === "dark" ? "text-white" : "text-gray-500"
              }`}
            >
              No products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
