import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
  const { login, googleLogin, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await googleLogin();
      Swal.fire({ title: "Successfully Signed In with Google", icon: "success", showConfirmButton: false, timer: 1500 });
      navigate("/hosting-dashboard/listings");
    } catch (error) {
      Swal.fire({ title: "Google Login Failed", text: "An error occurred. Please try again.", icon: "error" });
    } finally { setIsLoggingIn(false); }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    const form = event.target;
    try {
      await login(form.email.value, form.password.value);
      Swal.fire({ title: "Successfully Signed In", icon: "success", showConfirmButton: false, timer: 1500 });
      navigate("/");
    } catch (error) {
      Swal.fire({ title: "Login Failed", text: "Invalid email or password.", icon: "error" });
    } finally { setIsLoggingIn(false); }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Log In</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" id="email" name="email" placeholder="email" required disabled={isLoggingIn || loading} autoComplete="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#D1A054] focus:border-[#D1A054]" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" id="password" name="password" placeholder="password" required disabled={isLoggingIn || loading} autoComplete="current-password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-[#D1A054] focus:border-[#D1A054]" />
            <div className="mt-2 text-right">
              <Link to="/forgot-password" className="text-sm text-[#D1A054] hover:underline">Forgot password?</Link>
            </div>
          </div>
          <button type="submit" disabled={isLoggingIn || loading}
            className="w-full px-4 py-2 text-white bg-[#D1A054] rounded-md hover:bg-[#b18441] focus:outline-none disabled:opacity-50">
            {isLoggingIn || loading ? "Logging In..." : "Login"}
          </button>
        </form>

        <button onClick={handleGoogleLogin} disabled={isLoggingIn || loading}
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50">
          <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
          {isLoggingIn || loading ? "Logging In..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/registration" className="font-medium text-[#D1A054] hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
