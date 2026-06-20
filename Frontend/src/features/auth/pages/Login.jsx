import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(formData);
    if (result) {
      navigate("/");
    }
  };

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-[#0f0f0f]">
      <div className=" min-w-87.5  flex flex-col gap-4">
        <h1 className="text-white text-4xl font-bold">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="border-2 border-transparent outline-none px-4 py-4 rounded-xl bg-white text-black focus:border-white"
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
              className="border-2 border-transparent outline-none px-4 py-4 rounded-xl bg-white text-black focus:border-white"
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
            {isLoading ? "Loading..." : "Login"}
          </button>

          <p className="text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-[#e1034d]">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;
