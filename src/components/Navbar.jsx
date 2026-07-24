import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <Link to="/" className="text-3xl font-extrabold text-violet-600 tracking-tight">
          Prepzy
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">

          <Link
            to="/"
            className="hover:text-violet-600 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-violet-600 transition"
          >
            Login
          </Link>

          <Link
            to="/login"
            className="bg-violet-600 text-white px-5 py-2 rounded-xl hover:bg-violet-700 transition shadow-md"
          >
            Start Prepping
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;