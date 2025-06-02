import { BarChart3 } from "lucide-react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
      className="min-h-screen flex"
    >
      <div
        style={{ height: "100%" }}
        className="flex md:flex md:w-1/2 bg-primary-600 flex-col justify-center items-center text-white p-12"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%",
          }}
          className="max-w-md"
        >
          <div className="flex items-center mb-8">
            <BarChart3 size={32} className="mr-4" />
            <h1 className="text-3xl font-bold">PerformanceTrack</h1>
          </div>

          <div style={{textAlign:"center"}}>
            <h2 className="text-2xl font-bold mb-6">
              Monitor your website performance with ease
            </h2>

            <p className="mb-6 text-primary-100">
              Get detailed insights into your web application's performance
              metrics, run audits, and visualize data to ensure optimal user
              experience.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">
                Real-time Monitoring
              </h3>
              <p className="text-primary-100 text-sm">
                Track performance metrics across all your websites in real-time
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Performance Audits</h3>
              <p className="text-primary-100 text-sm">
                Run detailed audits and get actionable recommendations
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Data Visualization</h3>
              <p className="text-primary-100 text-sm">
                View beautiful charts and trends of your site's performance
              </p>
            </div>

            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Simple Integration</h3>
              <p className="text-primary-100 text-sm">
                Easy to integrate with any website with a single script
              </p>
            </div>
          </div>
          <NavLink style={{ width: "100%" }} to={"/login"}>
            <button
              style={{
                width: "100%",
                height: 50,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
