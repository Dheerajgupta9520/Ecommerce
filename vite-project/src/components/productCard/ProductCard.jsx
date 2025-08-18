import React, { useContext, useEffect, useMemo } from "react";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Toggle this to true if you want quick console debugging
const DEBUG = false;

function ProductCard({ head = "Our Latest Collection" }) {
  const {
    mode,
    product = [],
    searchkey = "",
    filterType = "",
    filterPrice = "",
  } = useContext(myContext);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  // --- Helpers ---
  const toStr = (v) => (v === null || v === undefined ? "" : String(v));
  const lc = (v) => toStr(v).toLowerCase().trim();

  // Parse a price-like value to a number (handles "₹ 1,299.50" -> 1299.5)
  const toNumber = (v) => {
    const s = toStr(v).replace(/[^0-9.]/g, "");
    return s ? Number(s) : NaN;
  };

  // Try to parse filterPrice into a numeric range if possible:
  // - "500-1000" -> {min:500, max:1000}
  // - {min:500,max:1000} or [500,1000] -> same
  // If not parseable, returns null and we’ll fallback to substring matching.
  const parsePriceRange = (fp) => {
    if (!fp && fp !== 0) return null;

    // array form
    if (Array.isArray(fp) && fp.length === 2) {
      const min = toNumber(fp[0]);
      const max = toNumber(fp[1]);
      return isNaN(min) && isNaN(max) ? null : { min, max };
    }

    // object form
    if (typeof fp === "object") {
      const min = toNumber(fp.min);
      const max = toNumber(fp.max);
      return isNaN(min) && isNaN(max) ? null : { min, max };
    }

    // string form: "500-1000"
    const str = toStr(fp).trim();
    const m = str.match(/^(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)$/);
    if (m) {
      const min = Number(m[1]);
      const max = Number(m[2]);
      return { min, max };
    }

    return null;
  };

  const priceRange = useMemo(() => parsePriceRange(filterPrice), [filterPrice]);

  // --- Filtering (robust & safe) ---
  const filteredProducts = useMemo(() => {
    const search = lc(searchkey);
    const type = lc(filterType);
    const priceSubstr = toStr(filterPrice).trim(); // for substring fallback

    const result = product.filter((item) => {
      const title = lc(item?.title);
      const category = lc(item?.category);
      const priceNum = toNumber(item?.price);
      const priceStr = toStr(item?.price); // raw string for substring fallback

      // Title filter (ignore when search empty)
      const passTitle = search ? title.includes(search) : true;

      // Type/category filter (ignore when filterType empty or 'all')
      const passType =
        !type || type === "all" ? true : category.includes(type);

      // Price filter:
      let passPrice = true;
      if (priceRange) {
        // Numeric range mode
        const { min, max } = priceRange;
        const hasMin = !isNaN(min);
        const hasMax = !isNaN(max);

        if (!isNaN(priceNum)) {
          if (hasMin && hasMax) passPrice = priceNum >= min && priceNum <= max;
          else if (hasMin) passPrice = priceNum >= min;
          else if (hasMax) passPrice = priceNum <= max;
        } else {
          // If price cannot be parsed, fail the numeric check
          passPrice = false;
        }
      } else if (priceSubstr) {
        // Substring fallback (e.g., typing "12" matches 1200)
        passPrice = priceStr.includes(priceSubstr);
      }

      return passTitle && passType && passPrice;
    });

    if (DEBUG) {
      // Light debug dump for the first item
      // eslint-disable-next-line no-console
      console.log("FILTERS =>", {
        searchkey,
        filterType,
        filterPrice,
        priceRange,
        sampleItem: product[0],
        afterCount: result.length,
      });
    }

    return result;
  }, [product, searchkey, filterType, filterPrice, priceRange]);

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
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {head}
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => {
              const { id, title, price, imageURL } = item || {};
              return (
                <div
                  key={id ?? index}
                  onClick={() => navigate(`/productinfo/${id}`)}
                  className="p-4 md:w-1/4 drop-shadow-lg cursor-pointer"
                >
                  <div
                    className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex justify-center">
                      <img
                        className="rounded-2xl w-full h-80 object-cover p-2 hover:scale-105 transition-transform duration-300 ease-in-out"
                        src={imageURL}
                        alt={title || "product"}
                      />
                    </div>
                    <div className="p-5 border-t-2">
                      <h2
                        className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        E-Bharat
                      </h2>
                      <h1
                        className="title-font text-lg font-medium text-gray-900 mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h1>
                      <p
                        className="leading-relaxed mb-3"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹ {toStr(price)}
                      </p>
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => handleAddToCart(item, e)}
                          type="button"
                          className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p
              className="text-center w-full mt-6 text-gray-500"
              style={{ color: mode === "dark" ? "white" : "" }}
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
