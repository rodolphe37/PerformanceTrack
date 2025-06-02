import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/auth/LoginForm";
import { BarChart3 } from "lucide-react";

const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary-200 mb-4"></div>
          <div className="h-4 w-24 bg-primary-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div style={{ padding: 25 }}>
      <NavLink style={{ margin: 50 }} to={"/"}>
        <button>Prev</button>
      </NavLink>

      <div
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        className="min-h-screen flex"
      >
        <div
          style={{ maxWidth: "60%" }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-8"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: 100,
              marginTop: -100,
            }}
            className="w-full max-w-md fade-in"
          >
            <div
              style={{ gap: 10 }}
              className="md:hidden flex items-center justify-center mb-12"
            >
              <BarChart3 size={32} className="text-primary-600 mr-4" />
              <h1
                style={{ marginBottom: 0 }}
                className="text-3xl font-bold text-gray-900"
              >
                PerformanceTrack
              </h1>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
