import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/data/myContext";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { motion } from "framer-motion";

function Login() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const tologin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Invalid credentials or something went wrong", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Floating background circles */}
      <motion.div
        className="absolute w-96 h-96 bg-purple-600 rounded-full mix-blend-screen blur-3xl opacity-30"
        animate={{ x: [0, 100, -100, 0], y: [0, 50, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-cyan-500 rounded-full mix-blend-screen blur-2xl opacity-20"
        animate={{ x: [0, -150, 150, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {loading && <Loader />}

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-black/70 backdrop-blur-xl px-10 py-10 rounded-2xl shadow-[0_0_40px_rgba(0,255,255,0.3)] border border-cyan-500 w-[90%] sm:w-[25em]"
      >
        <h1 className="text-center text-3xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        {/* Email input */}
        <motion.input
          whileFocus={{ scale: 1.02, boxShadow: "0 0 15px #00FFFF" }}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          className="bg-gray-800/70 mb-4 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none border border-cyan-500/30 focus:border-cyan-400 transition-all"
        />

        {/* Password input */}
        <motion.input
          whileFocus={{ scale: 1.02, boxShadow: "0 0 15px #9F7AEA" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          className="bg-gray-800/70 mb-6 px-4 py-3 w-full rounded-lg text-white placeholder-gray-400 outline-none border border-purple-500/30 focus:border-purple-400 transition-all"
        />

        {/* Login button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px #00FFFF" }}
          whileTap={{ scale: 0.95 }}
          onClick={tologin}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold tracking-wide shadow-lg"
        >
          Login
        </motion.button>

        {/* Signup link */}
        <p className="text-gray-300 mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-cyan-400 hover:text-purple-400 font-semibold"
          >
            Signup
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
