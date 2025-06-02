import React, { useState } from "react";
import { Copy, Eye, EyeOff, RefreshCw, Check } from "lucide-react";
import { apiService } from "../../services/apiService";
import { formatDate } from "../../utils/helpers";

const ApiKeyManager: React.FC = () => {
  const [apiKey, setApiKey] = useState(apiService.getApiKey());
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleGenerateKey = () => {
    setGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      const newKey = apiService.generateApiKey();
      setApiKey(newKey);
      setGenerating(false);
    }, 1000);
  };

  const handleCopyKey = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.key);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleShowKey = () => {
    setShowKey(!showKey);
  };

  return (
    <div style={{ padding: 12 }} className="border rounded-md p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-semibold">API Key</h3>
          <p className="text-gray-500 text-sm">
            Use this key to authenticate API requests
          </p>
        </div>
        <button
          style={{ marginBottom: 12 }}
          onClick={handleGenerateKey}
          disabled={generating}
          className="button secondary flex items-center gap-2"
        >
          <RefreshCw size={16} className={generating ? "animate-spin" : ""} />
          <span>{generating ? "Generating..." : "Generate New Key"}</span>
        </button>
      </div>

      {apiKey ? (
        <>
          <div className="mb-4">
            <div style={{ gap: 10 }} className="flex items-center gap-3 mb-2">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey.key}
                readOnly
                className="font-mono flex-1"
              />
              <button
                onClick={toggleShowKey}
                className="button secondary p-2"
                title={showKey ? "Hide API Key" : "Show API Key"}
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              <button
                onClick={handleCopyKey}
                className="button secondary p-2"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check size={18} className="text-success-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Created: {formatDate(apiKey.createdAt)}
            </div>
          </div>

          <div className="bg-primary-50 p-4 rounded-md text-sm">
            <p className="text-primary-700">
              Keep this key secure! If compromised, generate a new one
              immediately.
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No API key generated yet. Click the button above to create one.
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;
