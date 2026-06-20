import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  //hook
  const { register, isLoading } = useAuth();

  const navigate = useNavigate();

  // form ka data ek jagah store karne ke liye
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // jab bhi koi input change ho — formData update karo
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit hone pe register API call karo

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(formData);
    if (result) {
      navigate("/");
    }
  };
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-[#0f0f0f]">
      <div className=" min-w-87.5  flex flex-col gap-4">
        <h1 className="text-white text-4xl font-bold">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm" htmlFor="username">
              Username
            </label>
            <input
              className="border-2 border-transparent outline-none px-4 py-4 rounded-xl bg-white text-black focus:border-black"
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-transparent outline-none px-4 py-4 rounded-xl bg-white text-black focus:border-black"
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm" htmlFor="password">
              Password
            </label>
            <input
              className="border-2 border-transparent outline-none px-4 py-4 rounded-xl bg-white text-black focus:border-black"
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="border-none outline-none px-6 py-4 rounded-xl bg-[#e1034d] text-white cursor-pointer active:scale-95 transition-transform font-semibold disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Register"}
          </button>

          <p className="text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#e1034d]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Register;
