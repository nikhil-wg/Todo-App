import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function SignUp() {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChanges = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responce = await axios.post(
        "http://localhost:3000/signup",
        formData
      );

      alert("message: " + responce.data.message);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert("signup fail....!");
    }
  };
  const handleSignIn = () => {
    navigate("/signin");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-darkest">
      <div className="w-full max-w-sm p-6 bg-darker shadow-2xl rounded-lg">
        <h1 className="text-3xl font-bold text-light text-center mb-6">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChanges}
            required
            className="w-full px-4 py-2 bg-dark border border-light text-light rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChanges}
            required
            className="w-full px-4 py-2 bg-dark border border-light text-light rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChanges}
            required
            className="w-full px-4 py-2 bg-dark border border-light text-light rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
          />
          <button
            type="submit"
            className="w-full bg-accent text-slate-50 font-semibold py-2 rounded-lg hover:bg-dark hover:text-light transition duration-300"
          >
            SIGN UP
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-light">
            Already have an account?{" "}
            <a
              onClick={handleSignIn}
              className="text-accent hover:text-light underline cursor-pointer"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
