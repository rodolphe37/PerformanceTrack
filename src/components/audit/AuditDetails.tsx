import React from "react";
import { AuditResult } from "../../types";
import {
  Download,
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface AuditDetailsProps {
  audit: AuditResult;
  onBack: () => void;
}

const AuditDetails: React.FC<AuditDetailsProps> = ({ audit, onBack }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success-500";
    if (score >= 50) return "text-warning-500";
    return "text-error-500";
  };

  const getScoreClass = (score: number) => {
    if (score >= 90) return "bg-success-500 bg-opacity-10 text-success-500";
    if (score >= 50) return "bg-warning-500 bg-opacity-10 text-warning-500";
    return "bg-error-500 bg-opacity-10 text-error-500";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle size={18} className="text-success-500" />;
      case "needs-improvement":
        return <AlertTriangle size={18} className="text-warning-500" />;
      case "poor":
        return <XCircle size={18} className="text-error-500" />;
      default:
        return null;
    }
  };

  const formatMetricName = (name: string) => {
    const names: Record<string, string> = {
      load: "Page Load",
      fcp: "First Contentful Paint",
      lcp: "Largest Contentful Paint",
      cls: "Cumulative Layout Shift",
      fid: "First Input Delay",
      ttfb: "Time to First Byte",
    };

    return names[name] || name;
  };

  return (
    <div
      style={{ padding: 10 }}
      className="bg-white rounded-lg shadow-md p-8 fade-in"
    >
      <div className="flex justify-between items-center mb-8">
        <button
          style={{ margin: 10 }}
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-primary-500"
        >
          <ArrowLeft size={18} className="mr-2" />
          <span>Back to Audits</span>
        </button>

        <button className="flex items-center gap-2 button secondary">
          <Download size={16} />
          <span>Export Report</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Performance Audit Report</h1>
          <div className="flex items-center text-gray-500">
            <Clock size={16} className="mr-2" />
            <span>{new Date(audit.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div style={{ margin: 10 }} className="mt-4 md:mt-0 flex items-center">
          <div
            className={`text-4xl font-bold ${getScoreColor(audit.score)} mr-3`}
          >
            {audit.score}
          </div>
          <div
            className={`py-1 px-3 rounded-full text-sm font-medium ${getScoreClass(
              audit.score
            )}`}
          >
            {audit.score >= 90
              ? "Good"
              : audit.score >= 50
              ? "Needs Improvement"
              : "Poor"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {Object.entries(audit.metrics).map(([key, metric]) => (
          <div
            style={{ padding: 10 }}
            key={key}
            className="border rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  {formatMetricName(key)}
                </h3>
                <p className="text-gray-500 text-sm">
                  {key === "cls" ? "Unitless" : "Milliseconds"}
                </p>
              </div>
              <div className="flex items-center">
                {getStatusIcon(metric.status)}
                <span
                  className={`ml-2 font-medium ${getScoreColor(metric.score)}`}
                >
                  {metric.status === "good"
                    ? "Good"
                    : metric.status === "needs-improvement"
                    ? "Needs Improvement"
                    : "Poor"}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-bold">
                {metric.value}
                {key === "cls" ? "" : "ms"}
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${getScoreColor(
                  metric.score
                ).replace("text-", "bg-")}`}
                style={{ width: `${metric.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 style={{ padding: 10 }} className="text-lg font-semibold mb-4">
          Recommendations
        </h3>
        <ul style={{ lineHeight: 2, padding: 10 }} className="space-y-3">
          <li className="flex items-center" style={{ gap: 6 }}>
            <AlertTriangle
              color="orange"
              size={18}
              className="text-warning-500 mr-2 mt-0.5"
            />
            <span>
              Optimize image sizes and use next-gen formats like WebP or AVIF
            </span>
          </li>
          <li className="flex items-center" style={{ gap: 6 }}>
            <AlertTriangle
              color="orange"
              size={18}
              className="text-warning-500 mr-2 mt-0.5"
            />
            <span>
              Minimize main-thread work by reducing JavaScript execution time
            </span>
          </li>
          <li className="flex items-center" style={{ gap: 6 }}>
            <AlertTriangle
              color="orange"
              size={18}
              className="text-warning-500 mr-2 mt-0.5"
            />
            <span>Implement proper cache policies for static assets</span>
          </li>
          <li className="flex items-center" style={{ gap: 6 }}>
            <AlertTriangle
              color="orange"
              size={18}
              className="text-warning-500 mr-2 mt-0.5"
            />
            <span>
              Reduce server response times (TTFB) by optimizing server-side
              rendering
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AuditDetails;
