import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import { primaryButtonClass } from "../constants/buttonClasses";
import { AuthContext } from "../contexts/AuthContext";
import { authAPI } from "../lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await authAPI.login(email, password);
      if (response && response.token && response.user) {
        login(response.token, response.user);
        setMessage("Login successful. Redirecting...");
        setTimeout(() => {
          navigate("/profile");
        }, 500);
      } else {
        setError("Login response invalid. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="section-shell py-20">
      <div className="mx-auto max-w-xl glass-panel p-6 sm:p-8">
        <SectionHeading
          eyebrow="Login"
          title="Access your account"
          copy="Sign in to access your personalized learning experience, save favorites, and manage your wellness journey."
        />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-forest-700">Email</span>
            <input
              className="rounded-2xl border border-forest-100 bg-white px-4 py-3 outline-none transition focus:border-forest-400"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
              disabled={isLoading}
              placeholder="your.email@example.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-forest-700">Password</span>
            <input
              className="rounded-2xl border border-forest-100 bg-white px-4 py-3 outline-none transition focus:border-forest-400"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </label>
          <button 
            className={primaryButtonClass} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}
        {message && <p className="mt-4 text-sm font-medium text-forest-800">{message}</p>}

        <div className="mt-6 text-center text-sm text-forest-600">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-forest-700 hover:text-forest-900 underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
