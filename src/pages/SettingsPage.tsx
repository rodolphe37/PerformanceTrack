import React from "react";
import Layout from "../components/common/Layout";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import ScriptGenerator from "../components/settings/ScriptGenerator";
import ApiKeyManager from "../components/settings/ApiKeyManager";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Bell, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="fade-in">
        <DashboardHeader
          title="Settings"
          description="Manage your account and preferences"
        />

        <div
          style={{ gap: 10 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <div className="lg:col-span-1">
            <div
              style={{ padding: 12 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Account</h2>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "space-between",
                    marginBottom:20
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <User size={20} className="text-gray-500 mr-3" />
                    <span>Profile</span>
                  </div>

                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <Mail size={20} className="text-gray-500 mr-3" />
                    <span>Notifications</span>
                  </div>

                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <Bell size={20} className="text-gray-500 mr-3" />
                    <span>Alerts</span>
                  </div>

                  <div className="flex items-center p-3 rounded-md hover:bg-gray-50 cursor-pointer">
                    <Shield size={20} className="text-gray-500 mr-3" />
                    <span>Security</span>
                  </div>
                </div>
              </div>

              <div className="border-t p-6 bg-gray-50">
                <h3 className="font-semibold mb-2">Account Details</h3>
                <p className="text-sm text-gray-500">Email: {user?.email}</p>
                <p className="text-sm text-gray-500">Name: {user?.name}</p>
                <p className="text-sm text-gray-500">Plan: Professional</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ScriptGenerator />

            <div
              style={{ padding: 12 }}
              className="mt-8 bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-semibold mb-4">API Access</h2>
              <p className="text-gray-500 mb-6">
                Use our API to access your performance data programmatically or
                integrate with your own tools.
              </p>

              <ApiKeyManager />

              <div className="border-t pt-6 mt-6">
                <h3 className="font-semibold mb-3">Documentation</h3>
                <p className="text-gray-500 mb-4">
                  Check our documentation to learn how to use our API and
                  integrate with your tools.
                </p>
                <Link
                  to="/api-docs"
                  className="text-primary-500 hover:text-primary-600 font-semibold inline-flex items-center"
                >
                  View API Documentation →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
