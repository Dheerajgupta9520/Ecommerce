import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { motion } from "framer-motion";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const { loading, setLoading } = useContext(myContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toSignup = async () => {
    setLoading(true);

    const { name, email, password } = form;
    if (!name || !email || !password) {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);

      const user = {
        name,
        uid: users.user.uid,
        email: users.user.email,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      await addDoc(collection(fireDB, "users"), user);

      toast.success("Signup successful ✅");
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      {loading && <Loader />}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800 px-10 py-10 rounded-2xl shadow-2xl w-[90%] max-w-md"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white text-2xl mb-6 font-bold"
        >
          Create Account 🚀
        </motion.h1>

        {/* Input Fields */}
        {["name", "email", "password"].map((field, idx) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.2 }}
            className="mb-4"
          >
            <input
              type={field === "password" ? "password" : field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={
                field.charAt(0).toUpperCase() + field.slice(1)
              }
              className="bg-gray-700 px-3 py-2 w-full rounded-lg text-white placeholder:text-gray-300 outline-none focus:ring-2 focus:ring-red-500"
            />
          </motion.div>
        ))}

        {/* Signup Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center mb-4"
        >
          <button
            onClick={toSignup}
            className="bg-red-500 w-full text-white font-bold px-3 py-2 rounded-lg hover:bg-red-600 transition-all"
          >
            Signup
          </button>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white text-center"
        >
          Already have an account?{" "}
          <Link className="text-red-400 font-bold hover:underline" to="/login">
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Signup;
