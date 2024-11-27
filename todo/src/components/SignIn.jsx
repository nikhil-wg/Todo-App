import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update state based on 'name'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Fix typo: preventDefault, not preventDefult
    try {
      const response = await axios.post(
        "http://localhost:3000/signin",
        formData
      );
      localStorage.setItem("token", response.data.token);

      navigate("/todo");
    } catch (error) {
      console.log(error);
      alert("Something went wrong. Please enter details correctly.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-darkest">
        <div className="w-full max-w-sm p-6 bg-darker shadow-2xl rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-bold text-light text-center">
              Sign In
            </h2>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChanges}
              className="w-full px-4 py-2 bg-dark border border-light text-light rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChanges}
              className="w-full px-4 py-2 bg-dark border border-light text-light rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
            />
            <button
              type="submit"
              className="w-full bg-accent text-slate-50 font-semibold py-2 rounded-lg hover:bg-dark hover:text-light transition duration-300"
            >
              SIGN IN
            </button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-light">
              Don’t have an account?{" "}
              <a
                onClick={handleSignUp}
                className="text-accent hover:text-light underline cursor-pointer"
              >
                Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
