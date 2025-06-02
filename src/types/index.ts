export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  createdAt: string;
  status: "active" | "inactive" | "error";
}

export type MetricType = "load" | "fcp" | "lcp" | "cls" | "fid" | "ttfb";

export interface Metric {
  id: string;
  siteId: string;
  type: MetricType;
  value: number;
  timestamp: string;
  deviceType: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
}

export interface AuditResult {
  id: string;
  siteId: string;
  score: number;
  createdAt: string;
  companyName: string; // <-- ajouté
  companyUrl: string; // <-- ajouté
  metrics: {
    [key in MetricType]?: {
      score: number;
      value: number;
      status: "good" | "needs-improvement" | "poor";
    };
  };
  
}

export interface DataPoint {
  x: string | number;
  y: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill?: boolean;
    tension?: number;
  }[];
}
