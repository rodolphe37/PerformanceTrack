import { Site, Metric, AuditResult, MetricType } from "../types";

const METRIC_THRESHOLDS = {
  load: { good: 2500, poor: 4000 }, // ms
  fcp: { good: 1800, poor: 3000 }, // ms
  lcp: { good: 2500, poor: 4000 }, // ms
  cls: { good: 0.1, poor: 0.25 }, // unitless
  fid: { good: 100, poor: 300 }, // ms
  ttfb: { good: 800, poor: 1800 }, // ms
};

const BROWSERS = ["Chrome", "Firefox", "Safari", "Edge"];
const OS = ["Windows", "macOS", "iOS", "Android"];
const DEVICE_TYPES = ["mobile", "desktop", "tablet"] as const;

// Generate a random number between min and max
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Generate a random date within the last 30 days
const randomDate = (daysAgo = 30) => {
  const date = new Date();
  date.setDate(date.getDate() - random(0, daysAgo));
  return date.toISOString();
};

// Generate random metrics for a site
const generateMetric = (siteId: string, type: MetricType): Metric => {
  let value: number;

  switch (type) {
    case "load":
      value = random(1500, 5000); // 1.5s to 5s
      break;
    case "fcp":
      value = random(1000, 4000); // 1s to 4s
      break;
    case "lcp":
      value = random(1500, 5000); // 1.5s to 5s
      break;
    case "cls":
      value = Math.random() * 0.4; // 0 to 0.4
      break;
    case "fid":
      value = random(50, 400); // 50ms to 400ms
      break;
    case "ttfb":
      value = random(500, 2000); // 500ms to 2s
      break;
    default:
      value = random(0, 100);
  }

  return {
    id: `metric-${Math.random().toString(36).substr(2, 9)}`,
    siteId,
    type,
    value,
    timestamp: randomDate(),
    deviceType: DEVICE_TYPES[random(0, DEVICE_TYPES.length - 1)],
    browser: BROWSERS[random(0, BROWSERS.length - 1)],
    os: OS[random(0, OS.length - 1)],
  };
};

const getMetricStatus = (type: MetricType, value: number) => {
  const thresholds = METRIC_THRESHOLDS[type];
  if (value <= thresholds.good) return "good";
  if (value >= thresholds.poor) return "poor";
  return "needs-improvement";
};

// Generate an audit result with performance scores
const generateAuditResult = (siteId: string): AuditResult => {
  const metricTypes: MetricType[] = [
    "load",
    "fcp",
    "lcp",
    "cls",
    "fid",
    "ttfb",
  ];
  const metricsPartial: Partial<
    Record<
      MetricType,
      {
        score: number;
        value: number;
        status: "good" | "needs-improvement" | "poor";
      }
    >
  > = {};

  const metrics = metricsPartial as Record<
    MetricType,
    {
      score: number;
      value: number;
      status: "good" | "needs-improvement" | "poor";
    }
  >;

  metricTypes.forEach((type) => {
    const value = generateMetric(siteId, type).value;
    const status = getMetricStatus(type, value);

    let score: number;
    if (status === "good") {
      score = random(80, 100);
    } else if (status === "needs-improvement") {
      score = random(50, 79);
    } else {
      score = random(0, 49);
    }

    metricsPartial[type] = { score, value, status };
  });

  // Calcul du score global moyen
  const overallScore = Math.round(
    Object.values(metrics).reduce((sum, { score }) => sum + score, 0) /
      metricTypes.length
  );

  // Recherche du site correspondant pour récupérer le nom et l'url
  const site = sites.find((s) => s.id === siteId);

  if (!site) {
    throw new Error(`Site with id ${siteId} not found`);
  }

  return {
    id: `audit-${Math.random().toString(36).substr(2, 9)}`,
    siteId,
    score: overallScore,
    createdAt: randomDate(7),
    metrics,
    companyName: site.name,
    companyUrl: site.url,
  };
};

// Demo sites
export const sites: Site[] = [
  {
    id: "site-1",
    name: "E-commerce Store",
    url: "https://demo-ecommerce.example.com",
    createdAt: randomDate(90), // ici, il faut que randomDate soit importée ou définie dans ce fichier
    status: "active",
  },
  {
    id: "site-2",
    name: "Company Blog",
    url: "https://blog.example.com",
    createdAt: randomDate(60),
    status: "active",
  },
  {
    id: "site-3",
    name: "Marketing Landing Page",
    url: "https://landing.example.com",
    createdAt: randomDate(30),
    status: "inactive",
  },
  {
    id: "site-4",
    name: "Customer Portal",
    url: "https://portal.example.com",
    createdAt: randomDate(15),
    status: "error",
  },
];

// Generate metrics for each site (30 data points per site)
export const generateMetrics = () => {
  const metrics: Metric[] = [];
  const metricTypes: MetricType[] = [
    "load",
    "fcp",
    "lcp",
    "cls",
    "fid",
    "ttfb",
  ];

  sites.forEach((site) => {
    // Generate 5 data points per metric type
    metricTypes.forEach((type) => {
      for (let i = 0; i < 30; i++) {
        metrics.push(generateMetric(site.id, type));
      }
    });
  });

  return metrics;
};

// Generate audit results for each site (1 per site)
export const generateAuditResults = () => {
  return sites.map((site) => generateAuditResult(site.id));
};

// Get metrics for a specific site
export const getSiteMetrics = (siteId: string) => {
  return generateMetrics().filter((metric) => metric.siteId === siteId);
};

// Get audit results for a specific site
export const getSiteAuditResults = (siteId: string) => {
  return generateAuditResults().filter((audit) => audit.id === siteId);
};

// Get metrics grouped by date for charting
export const getMetricsForChart = (
  siteId: string,
  metricType: MetricType,
  days = 7
) => {
  const metrics = getSiteMetrics(siteId).filter((m) => m.type === metricType);

  // Sort by date
  metrics.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );

  // Take only the most recent metrics
  const recentMetrics = metrics.slice(-days);

  // Format for chart
  return {
    labels: recentMetrics.map((m) => {
      const date = new Date(m.timestamp);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }),
    datasets: [
      {
        label: metricType.toUpperCase(),
        data: recentMetrics.map((m) => m.value),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };
};
