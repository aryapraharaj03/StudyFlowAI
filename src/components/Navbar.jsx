import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-md sticky top-0">

      <h2 className="text-2xl font-bold text-purple-600">
        StudyFlow AI
      </h2>

      <div className="flex gap-8">

        <Link
  to="/"
  className="hover:text-purple-600 transition duration-300"
>
  Home
</Link>

        <a
  href="#"
  className="hover:text-purple-600 transition duration-300"
>
  Features
</a>

        <Link
  to="/login"
  className="hover:text-purple-600 transition duration-300"
>
  Login
</Link>

<Link
  to="/signup"
  className="hover:text-purple-600 transition duration-300"
>
  Sign Up
</Link>

      </div>

    </nav>
  );
}

export default Navbar;