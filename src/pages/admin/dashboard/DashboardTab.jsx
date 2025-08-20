import React, { useContext } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { motion } from "framer-motion";
import myContext from "../../../context/data/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping } from "react-icons/ai";
import { Link } from "react-router-dom";

function DashboardTab() {
  const { mode, product, editHandle, deleteProduct, order, user } =
    useContext(myContext);

  const darkStyle = {
    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
    color: mode === "dark" ? "white" : "",
  };

  const addProduct = () => {
    window.location.href = "/addproduct";
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="container mx-auto">
      <Tabs defaultIndex={0}>
        {/* Tab List */}
        <TabList className="grid grid-cols-2 md:flex md:space-x-8 gap-4 justify-center mb-10">
          {[
            { icon: <MdOutlineProductionQuantityLimits />, label: "Products", color: "purple" },
            { icon: <AiFillShopping />, label: "Orders", color: "pink" },
            { icon: <FaUser />, label: "Users", color: "green" },
          ].map((tab, index) => (
            <Tab key={index}>
              <button
                className={`font-medium border-b-2 text-${tab.color}-500 border-${tab.color}-500 
                hover:shadow-${tab.color}-700 bg-[#605d5d12] rounded-lg text-xl 
                shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5`}
              >
                <div className="flex gap-2 items-center">
                  {tab.icon} {tab.label}
                </div>
              </button>
            </Tab>
          ))}
        </TabList>

        {/* Products Tab */}
        <TabPanel>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="px-4 md:px-0 mb-16"
          >
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={darkStyle}>
              Product Details
            </h1>
            <div className="flex justify-end">
              <button
                onClick={addProduct}
                className="focus:outline-none bg-pink-600 hover:bg-pink-700 text-white 
                  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]"
                style={darkStyle}
              >
                <div className="flex gap-2 items-center">
                  Add Product <FaCartPlus size={20} />
                </div>
              </button>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-200 border border-gray-600" style={darkStyle}>
                  <tr>
                    {["S.No", "Image", "Title", "Price", "Category", "Date", "Action"].map((h) => (
                      <th key={h} className="px-6 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, i) => (
                    <motion.tr
                      key={i}
                      variants={fadeUp}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      className="bg-gray-50 border-b"
                      style={darkStyle}
                    >
                      <td className="px-6 py-4">{i + 1}.</td>
                      <td className="px-6 py-4"><img className="w-16" src={item.imageURL} alt="img" /></td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-6 py-4">₹{item.price}</td>
                      <td className="px-6 py-4">{item.category}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4 flex gap-2">
                        <button onClick={() => deleteProduct(item)} className="text-red-500 hover:text-red-700">
                          🗑
                        </button>
                        <Link to="/updateproduct" onClick={() => editHandle(item)} className="text-blue-500 hover:text-blue-700">
                          ✏
                        </Link>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-16">
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={darkStyle}>
              Order Details
            </h1>
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-200" style={darkStyle}>
                <tr>
                  {[
                    "S.No", "Payment Id", "Image", "Title", "Price", "Category",
                    "Name", "Address", "Pincode", "Phone", "Email", "Date"
                  ].map((h) => (
                    <th key={h} className="px-3 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {order.map((o, oi) =>
                  o.cartItems.map((item, ii) => (
                    <motion.tr
                      key={`${oi}-${ii}`}
                      variants={fadeUp}
                      custom={ii}
                      initial="hidden"
                      animate="visible"
                      className="bg-gray-50 border-b"
                      style={darkStyle}
                    >
                      <td className="px-3 py-4">{oi * o.cartItems.length + ii + 1}.</td>
                      <td className="px-1 py-4">{o.paymentId}</td>
                      <td className="px-6 py-4"><img className="w-16" src={item.imageURL} alt="img" /></td>
                      <td className="px-6 py-4">{item.title}</td>
                      <td className="px-3 py-4">₹{item.price}</td>
                      <td className="px-3 py-4">{item.category}</td>
                      <td className="px-3 py-4">{o.addressInfo.name}</td>
                      <td className="px-2 py-4">{o.addressInfo.address}</td>
                      <td className="px-2 py-4">{o.addressInfo.pincode}</td>
                      <td className="px-2 py-4">{o.addressInfo.phoneNumber}</td>
                      <td className="px-2 py-4">{o.email}</td>
                      <td className="px-2 py-4">{o.date}</td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </motion.div>
        </TabPanel>

        {/* Users Tab */}
        <TabPanel>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-10">
            <h1 className="text-center mb-5 text-3xl font-semibold underline" style={darkStyle}>
              User Details
            </h1>
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-gray-200" style={darkStyle}>
                <tr>
                  {["S.No", "Uid", "Name", "Email", "Date"].map((h) => (
                    <th key={h} className="px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {user.map((u, i) => (
                  <motion.tr
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    className="bg-gray-50 border-b"
                    style={darkStyle}
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4">{u.uid}</td>
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">{u.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DashboardTab;
