import React from "react";
import { AuditResult } from "../../types";
import { Clock, Zap, FileText } from "lucide-react";

interface AuditCardProps {
  audit: AuditResult;
  onClick: (audit: AuditResult) => void;
}

const AuditCard: React.FC<AuditCardProps> = ({ audit, onClick }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success-500";
    if (score >= 50) return "text-warning-500";
    return "text-error-500";
  };

  const getScoreBackgroundColor = (score: number) => {
    if (score >= 90) return "bg-success-500 bg-opacity-10";
    if (score >= 50) return "bg-warning-500 bg-opacity-10";
    return "bg-error-500 bg-opacity-10";
  };

  return (
    <div className="card cursor-pointer" onClick={() => onClick(audit)}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div
            className={`p-3 ${getScoreBackgroundColor(
              audit.score
            )} rounded-full mr-4`}
          >
            <Zap size={24} className={getScoreColor(audit.score)} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Performance Audit</h3>
            <div className="text-sm text-gray-700">
              <a
                href={audit.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-primary-600"
              >
                {audit.companyName}
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock size={14} className="mr-1" />
              <span>{new Date(audit.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className={`text-2xl font-bold ${getScoreColor(audit.score)}`}>
          {audit.score}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {Object.entries(audit.metrics).map(([key, value]) => (
          <div key={key} className="bg-gray-100 p-3 rounded-md">
            <div className="text-sm text-gray-600 uppercase mb-1">{key}</div>
            <div className={`font-semibold ${getScoreColor(value!.score)}`}>
              {value!.value}
              {key === "cls" ? "" : "ms"}
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center text-white hover:text-primary-600">
        <FileText size={16} className="mr-2" />
        <span>View Full Report</span>
      </button>
    </div>
  );
};

export default AuditCard;
