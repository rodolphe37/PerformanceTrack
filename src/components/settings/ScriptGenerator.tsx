import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

const ScriptGenerator: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [siteId, setSiteId] = useState("your-site-id");
  const [endpoint, setEndpoint] = useState(
    "https://api.performancetrack.example.com"
  );

  const script = `
<!-- PerformanceTrack Monitoring Script -->
<script>
(function() {
  // Configuration
  var config = {
    siteId: "${siteId}",
    endpoint: "${endpoint}/collect",
    sampleRate: 100, // Percentage of sessions to track
  };

  // Collect browser and device information
  var browserInfo = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    devicePixelRatio: window.devicePixelRatio || 1,
    timestamp: new Date().toISOString()
  };

  // Performance metrics collector
  var collectMetrics = function() {
    // Basic metrics from Navigation Timing API
    var navigationTiming = performance.timing;
    var loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
    var ttfb = navigationTiming.responseStart - navigationTiming.navigationStart;

    // Get Web Vitals if available
    var fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    var fcp = fcpEntry ? fcpEntry.startTime : null;
    
    var lcpObserver = new PerformanceObserver(function(list) {
      var entries = list.getEntries();
      var lastEntry = entries[entries.length - 1];
      sendMetric('lcp', lastEntry.startTime);
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    
    var clsObserver = new PerformanceObserver(function(list) {
      var cls = 0;
      list.getEntries().forEach(function(entry) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      sendMetric('cls', cls);
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    
    var fidObserver = new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        sendMetric('fid', entry.processingStart - entry.startTime);
      });
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });

    // Send initial metrics
    sendMetric('load', loadTime);
    sendMetric('ttfb', ttfb);
    if (fcp) sendMetric('fcp', fcp);
  };

  // Send metric to collection endpoint
  var sendMetric = function(type, value) {
    var data = {
      siteId: config.siteId,
      type: type,
      value: value,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      browserInfo: browserInfo
    };

    // Use Beacon API if available, otherwise fall back to fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon(config.endpoint, JSON.stringify(data));
    } else {
      fetch(config.endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      }).catch(function(error) {
        console.error('Failed to send metric:', error);
      });
    }
  };

  // Start collecting metrics once page is loaded
  if (document.readyState === 'complete') {
    collectMetrics();
  } else {
    window.addEventListener('load', collectMetrics);
  }
})();
</script>
<!-- End PerformanceTrack Monitoring Script -->
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: 12 }} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Performance Monitoring Script</h2>
      <p className="text-gray-500 mb-6">
        Add this script to your website's <code>&lt;head&gt;</code> section to
        start collecting performance data.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="form-group">
          <label htmlFor="siteId">Site ID</label>
          <input
            type="text"
            id="siteId"
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endpoint">API Endpoint</label>
          <input
            type="text"
            id="endpoint"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
          />
        </div>
      </div>

      <div style={{borderBottom:"1px solid gray"}} className="relative">
        <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm leading-relaxed">
          <code>{script}</code>
        </pre>

        <button style={{width:"100%", background:"blue", marginBottom:20}}
          onClick={copyToClipboard}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-md transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy size={18} />
          )}
        </button>
      </div>

      <div
        style={{ color: "#fff", borderRadius:6, boxShadow:"1px 2px 3px gray", marginTop:20 }}
        className="mt-6 bg-primary-500 bg-opacity-10 text-white p-4 rounded-lg"
      >
        <h3
          style={{ color: "#fff", textDecoration: "underline" }}
          className="font-semibold text-white mb-2"
        >
          What this script collects:
        </h3>
        <ul
          style={{ listStyle: "none" }}
          className="list-disc pl-5 space-y-1 text-white"
        >
          <li>Page load time</li>
          <li>Time to First Byte (TTFB)</li>
          <li>First Contentful Paint (FCP)</li>
          <li>Largest Contentful Paint (LCP)</li>
          <li>Cumulative Layout Shift (CLS)</li>
          <li>First Input Delay (FID)</li>
          <li>Basic device and browser information</li>
        </ul>
      </div>
    </div>
  );
};

export default ScriptGenerator;
