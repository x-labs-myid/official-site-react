import { FaLock, FaUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import {
  schemaLoginRequest,
  type SchemaLoginRequest,
} from "@/xyz-panel/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/xyz-panel/api/auth";
import globalHook from "@/hooks/global";
import { setToken, setUser } from "@/xyz-panel/utils/auth";
import { useNavigate } from "react-router-dom";
import PageHead from "@/xyz-panel/components/PageHead";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLoginRequest>({
    resolver: zodResolver(schemaLoginRequest),
  });
  const { toggleLoading, toggleToast } = globalHook();

  const onSubmit = async (data: SchemaLoginRequest) => {
    try {
      toggleLoading(true, `Loading...`);
      const response = (await login(data)).data;
      let user = {
        email: response.user.email,
        first_name: response.user.first_name,
        middle_name: response.user.middle_name,
        last_name: response.user.last_name,
        username: response.user.username,
        role: response.user.role,
      };
      setUser(JSON.stringify(user));
      setToken(response.access_token);
      toggleToast(true, `Welcome ${user.username}`, "success");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Oops, incorrect email/username or password";
      toggleToast(true, message, "error");
    } finally {
      toggleLoading(false);
    }
  };

  return (
    <>
      <PageHead title="Login" />
      <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden p-4 bg-base-200">
        {/* ... existing content ... */}
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-slate-700/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gray-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main login card with glassmorphism */}
        <div className="card w-full max-w-md bg-base-100/70 backdrop-blur-md shadow-2xl relative z-10 border border-white/10">
          <div className="card-body">
            {/* Logo/Title Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-slate-700 to-gray-800 mb-4 shadow-lg">
                <img
                  src="/icon-only-v2.png"
                  alt="X-Labs Logo"
                  className="w-12 h-12"
                  onError={(e) => {
                    // Fallback to SVG icon if image fails to load
                    e.currentTarget.style.display = "none";
                    const svg = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "svg"
                    );
                    svg.setAttribute("class", "w-10 h-10 text-white");
                    svg.setAttribute("fill", "none");
                    svg.setAttribute("stroke", "currentColor");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    const path = document.createElementNS(
                      "http://www.w3.org/2000/svg",
                      "path"
                    );
                    path.setAttribute("stroke-linecap", "round");
                    path.setAttribute("stroke-linejoin", "round");
                    path.setAttribute("stroke-width", "2");
                    path.setAttribute(
                      "d",
                      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    );
                    svg.appendChild(path);
                    e.currentTarget.parentElement?.appendChild(svg);
                  }}
                />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-600 to-gray-700 bg-clip-text text-transparent">
                Xyz Panel
              </h2>
              <p className="text-base-content/60 mt-2">Sign in to continue</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Email / Username
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-base-content/40" />
                  </div>
                  <input
                    type="text"
                    placeholder="Email / Username"
                    className="input input-bordered w-full pl-12 focus:input-primary transition-all duration-300"
                    {...register("email")}
                    required
                  />
                </div>
                {errors.email && (
                  <span className="text-error text-sm mt-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute z-10 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-base-content/40" />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-12 focus:input-primary transition-all duration-300"
                    {...register("password")}
                    required
                  />
                </div>
                {errors.password && (
                  <span className="text-error text-sm mt-1">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
