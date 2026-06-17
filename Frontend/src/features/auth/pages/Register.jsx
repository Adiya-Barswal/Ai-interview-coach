import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
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
            />
          </div>

          <button
            type="submit"
            className="border-none outline-none px-6 py-4 rounded-xl bg-[#e1034d] text-white cursor-pointer active:scale-95 transition-transform font-semibold"
          >
            Register
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
