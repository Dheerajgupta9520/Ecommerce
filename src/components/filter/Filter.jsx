import React, { useContext, useMemo } from "react";
import myContext from "../../context/data/myContext";
import { motion } from "framer-motion";

function Filter() {
  const {
    mode,
    searchKey,
    setSearchKey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    product,
  } = useContext(myContext);

  // ✅ Unique categories
  const categories = useMemo(() => {
    const unique = new Set(product.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [product]);

  // ✅ Price ranges
  const priceRanges = useMemo(
    () => [
      { label: "All", value: "" },
      { label: "Under ₹5000", value: "0-5000" },
      { label: "₹5000 - ₹10000", value: "5000-10000" },
      { label: "₹10000 - ₹25000", value: "10000-25000" },
      { label: "Above ₹25000", value: "25000-" },
    ],
    []
  );

  // ✅ Reset filters
  const handleReset = () => {
    setSearchKey("");
    setFilterType("all");
    setFilterPrice("");
  };

  return (
    <motion.div
      className="container mx-auto px-4 mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="p-6 rounded-2xl shadow-xl backdrop-blur-xl border 
        border-gray-500/30 relative overflow-hidden"
        style={{
          background:
            mode === "dark"
              ? "linear-gradient(135deg, rgba(40,44,52,0.9), rgba(20,20,20,0.8))"
              : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(230,230,230,0.8))",
          color: mode === "dark" ? "white" : "black",
        }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Glow effect background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-20 blur-3xl -z-10" />

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="🔍 Search products..."
            className="px-10 py-3 w-full rounded-xl outline-none text-sm 
            bg-gray-200/20 dark:bg-gray-700/40 
            text-white placeholder-gray-300 border border-gray-500/20 
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
        </div>

        {/* Filters Header */}
        <div className="flex items-center justify-between mt-6">
          <p className="font-semibold tracking-wide text-lg">⚡ Filters</p>
          <motion.button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 
            text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
            whileTap={{ scale: 0.9 }}
          >
            Reset
          </motion.button>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
          {/* Category */}
          <motion.select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200/20 dark:bg-gray-700/40 
            text-white border border-gray-500/20 text-sm outline-none
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat} className="text-black">
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </motion.select>

          {/* Price */}
          <motion.select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="px-4 py-3 rounded-xl bg-gray-200/20 dark:bg-gray-700/40 
            text-white border border-gray-500/20 text-sm outline-none
            focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            {priceRanges.map((range, index) => (
              <option key={index} value={range.value} className="text-black">
                {range.label}
              </option>
            ))}
          </motion.select>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default React.memo(Filter);
