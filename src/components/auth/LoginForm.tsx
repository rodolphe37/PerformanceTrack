import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AlertCircle } from "lucide-react";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again." + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign in to your account
        </h1>
        <p className="text-gray-500 text-center mb-8">
          Enter your credentials to access your performance monitoring dashboard
        </p>

        {error && (
          <div className="bg-error-500 bg-opacity-10 text-error-500 p-4 rounded-md flex items-start gap-3 mb-6 fade-in">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="mb-4"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
          className="mb-2"
        />
        <div className="flex justify-end">
          <a
            href="#"
            className="text-sm text-primary-500 hover:text-primary-600"
          >
            Forgot password?
          </a>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-6"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Demo credentials are pre-filled for you</p>
      </div>
    </form>
  );
};

export default LoginForm;
