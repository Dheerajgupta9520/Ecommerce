import React, { useContext } from "react";
import { FaBox, FaTruck, FaUserTie } from "react-icons/fa";
import { motion } from "framer-motion";
import myContext from "../../../context/data/myContext";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";

const stats = [
  { id: 1, label: "Total Products", icon: <FaBox size={50} />, key: "product" },
  { id: 2, label: "Total Orders", icon: <FaTruck size={50} />, key: "order" },
  { id: 3, label: "Total Users", icon: <FaUserTie size={50} />, key: "user" },
  { id: 4, label: "Total Categories", icon: <FaUserTie size={50} />, value: 2 },
];

function Dashboard() {
  const { mode, order, user, product } = useContext(myContext);

  // Dynamically pick value from context
  const getValue = (key, value) => {
    if (value !== undefined) return value;
    if (key === "product") return product?.length || 0;
    if (key === "order") return order?.length || 0;
    if (key === "user") return user?.length || 0;
    return 0;
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center justify-center">
            {stats.map((item, index) => (
              <motion.div
                key={item.id}
                className="p-4 md:w-1/4 sm:w-1/2 w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-6 rounded-2xl transition duration-300 ease-in-out"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <div className="text-purple-500 w-12 h-12 mb-3 mx-auto flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h2
                    className="title-font font-bold text-3xl text-black"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {getValue(item.key, item.value)}
                  </h2>
                  <p
                    className="font-semibold mt-2"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    {item.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <DashboardTab />
      </section>
    </Layout>
  );
}

export default Dashboard;
