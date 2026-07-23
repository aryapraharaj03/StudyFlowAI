import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    navigate("/dashboard");
  } catch (error) {
    alert(error.message);
  }
};

  return (
  <div className="min-h-screen bg-gray-100">
    <Navbar />

    <div className="flex items-center justify-center py-20">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">

        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
  onChange={(e) => setEmail(e.target.value)}
          className="border w-full mt-8 p-3 rounded-lg"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
  onChange={(e) => setPassword(e.target.value)}
          className="border w-full mt-4 p-3 rounded-lg"
        />

        <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="text-purple-600 mt-2 text-sm"
>
  {showPassword ? "Hide Password" : "Show Password"}
</button>

        <button
  onClick={handleLogin}
  className="bg-purple-600 text-white w-full mt-6 p-3 rounded-lg hover:bg-purple-700 transition"
>
  Login
</button>

        <p className="text-center mt-6">
  Don't have an account?{" "}
  <Link
    to="/signup"
    className="text-purple-600 font-semibold hover:underline"
  >
    Create Account
  </Link>
</p>

      </div>
    </div>

    <Footer />
  </div>
);
}

export default Login;