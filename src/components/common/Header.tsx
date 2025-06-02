import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Settings, Home, LogOut, PieChart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header
      style={{ boxShadow: "1px 2px 3px gray", marginBottom: 15 }}
      className="bg-white shadow-md"
    >
      <div className="container flex justify-between items-center py-2">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-500">
            PerformanceTrack
          </span>
        </div>

        <nav>
          <ul style={{ listStyle: "none" }} className="flex items-center gap-4">
            <li>
              <Link
                style={
                  isActive("/dashboard")
                    ? { fontWeight: "bold", textDecoration: "underline" }
                    : {}
                }
                to="/dashboard"
                className={`flex items-center gap-2 p-4 ${
                  isActive("/dashboard")
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-gray-700"
                }`}
              >
                <Home size={18} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                style={
                  isActive("/audit")
                    ? { fontWeight: "bold", textDecoration: "underline" }
                    : {}
                }
                to="/audit"
                className={`flex items-center gap-2 p-4 ${
                  isActive("/audit")
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-gray-700"
                }`}
              >
                <PieChart size={18} />
                <span>Audit</span>
              </Link>
            </li>
            <li>
              <Link
                style={
                  isActive("/graphs")
                    ? { fontWeight: "bold", textDecoration: "underline" }
                    : {}
                }
                to="/graphs"
                className={`flex items-center gap-2 p-4 ${
                  isActive("/graphs")
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-gray-700"
                }`}
              >
                <BarChart3 size={18} />
                <span>Graphs</span>
              </Link>
            </li>
            <li>
              <Link
                style={
                  isActive("/settings")
                    ? { fontWeight: "bold", textDecoration: "underline" }
                    : {}
                }
                to="/settings"
                className={`flex items-center gap-2 p-4 ${
                  isActive("/settings")
                    ? "text-primary-500 border-b-2 border-primary-500"
                    : "text-gray-700"
                }`}
              >
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-2 text-gray-700 p-4 hover:text-primary-500"
              >
                <LogOut color="white" size={18} />
                <span style={{ color: "white" }}>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
