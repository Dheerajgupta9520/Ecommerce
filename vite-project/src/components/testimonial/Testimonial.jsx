import React, { useContext } from "react";
import myContext from "../../context/data/myContext";
import { motion } from "framer-motion";

function Testimonial() {
  const context = useContext(myContext);
  const { mode } = context;

  const testimonials = [
    {
      name: "Dheeraj Gupta",
      role: "Developer",
      img: "https://ecommerce-sk.vercel.app/img/kamal.png",
      text: "This platform is an absolute game-changer! Smooth shopping experience, beautiful UI, and great performance.",
    },
    {
      name: "React Js",
      role: "UI Developer",
      img: "https://cdn-icons-png.flaticon.com/128/2763/2763444.png",
      text: "Building my project with this site was seamless. The attention to detail is impressive.",
    },
    {
      name: "React Js",
      role: "CTO",
      img: "https://webknudocs.vercel.app/logo/react.png",
      text: "As a CTO, I look for efficiency and quality. This platform delivered both perfectly.",
    },
  ];

  return (
    <section
      className={`py-16 px-6 md:px-12 transition-colors duration-500 ${
        mode === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl font-bold mb-4 ${
            mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          What Our <span className="text-pink-500">Customers</span> Say
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`mb-12 text-lg ${
            mode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Real feedback from people who trust our services and products.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className={`p-6 rounded-2xl shadow-lg ${
                mode === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 mx-auto rounded-full border-4 border-pink-500 shadow-md mb-6"
              />
              <p
                className={`leading-relaxed mb-6 ${
                  mode === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                "{t.text}"
              </p>
              <span className="block h-1 w-10 mx-auto rounded bg-pink-500 mb-4" />
              <h2
                className={`text-lg font-semibold ${
                  mode === "dark" ? "text-pink-400" : "text-gray-900"
                }`}
              >
                {t.name}
              </h2>
              <p
                className={`text-sm ${
                  mode === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {t.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
