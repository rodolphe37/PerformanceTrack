import React from "react";
import Layout from "../components/common/Layout";
import { Code } from "lucide-react";

const ApiDocsPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div
          style={{ boxShadow: "1px 2px 3px gray", padding: 10 }}
          className="bg-white rounded-lg shadow-md p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code size={24} className="text-primary-500" />
            <h1 className="text-2xl font-bold">API Documentation</h1>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Authentication</h2>
              <p className="text-gray-600 mb-4">
                All API requests must include your API key in the Authorization
                header:
              </p>
              <div className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm">
                Authorization: Bearer your_api_key_here
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Endpoints</h2>

              <div className="space-y-6">
                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Get Performance Metrics
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Retrieve performance metrics for a specific site.
                  </p>

                  <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-4">
                    <p className="font-semibold text-primary-700">
                      GET /api/v1/metrics
                    </p>
                  </div>

                  <h4 className="font-semibold mb-2">Query Parameters</h4>
                  <ul
                    style={{ listStyle: "none", lineHeight: 1.8, paddingBottom:10 }}
                    className="list-disc pl-5 space-y-2 text-gray-600 mb-4"
                  >
                    <li>
                      <code>siteId</code> - Required. The ID of the site
                    </li>
                    <li>
                      <code>from</code> - Optional. Start date (ISO 8601)
                    </li>
                    <li>
                      <code>to</code> - Optional. End date (ISO 8601)
                    </li>
                    <li>
                      <code>metrics</code> - Optional. Comma-separated list of
                      metrics
                    </li>
                  </ul>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Create Performance Record
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Submit new performance metrics for a site.
                  </p>

                  <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-4">
                    <p className="font-semibold text-primary-700">
                      POST /api/v1/metrics
                    </p>
                  </div>

                  <h4 className="font-semibold mb-2">Request Body</h4>
                  <pre className="bg-gray-800 text-gray-200 p-4 rounded-md font-mono text-sm">
                    {`{
  "siteId": "string",
  "metrics": {
    "load": number,
    "fcp": number,
    "lcp": number,
    "cls": number,
    "fid": number,
    "ttfb": number
  },
  "userAgent": "string",
  "timestamp": "string"
}`}
                  </pre>
                </div>

                <div className="border-b pb-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Get Audit Results
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Retrieve audit results for a specific site.
                  </p>

                  <div className="bg-primary-50 border border-primary-100 rounded-md p-4 mb-4">
                    <p className="font-semibold text-primary-700">
                      GET /api/v1/audits
                    </p>
                  </div>

                  <h4 className="font-semibold mb-2">Query Parameters</h4>
                  <ul
                    style={{ listStyle: "none", lineHeight: 1.8, paddingBottom:10 }}
                    className="list-disc pl-5 space-y-2 text-gray-600"
                  >
                    <li>
                      <code>siteId</code> - Required. The ID of the site
                    </li>
                    <li>
                      <code>limit</code> - Optional. Number of results (default:
                      10)
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Rate Limits</h2>
              <p className="text-gray-600 mb-4">API requests are limited to:</p>
              <ul
                style={{ listStyle: "none", lineHeight: 1.8, paddingBottom:10 }}
                className="list-disc pl-5 space-y-2 text-gray-600"
              >
                <li>1000 requests per hour for metrics submission</li>
                <li>100 requests per minute for data retrieval</li>
                <li>10 requests per minute for audit operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">Error Handling</h2>
              <p className="text-gray-600 mb-4">
                The API uses conventional HTTP response codes:
              </p>
              <ul
                style={{ listStyle: "none", lineHeight: 1.8 }}
                className="list-disc pl-5 space-y-2 text-gray-600"
              >
                <li>
                  <code>200</code> - Success
                </li>
                <li>
                  <code>400</code> - Bad request
                </li>
                <li>
                  <code>401</code> - Unauthorized
                </li>
                <li>
                  <code>403</code> - Forbidden
                </li>
                <li>
                  <code>429</code> - Too many requests
                </li>
                <li>
                  <code>500</code> - Server error
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiDocsPage;
