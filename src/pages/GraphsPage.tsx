import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import PerformanceChart from '../components/graphs/PerformanceChart';
import { sites, getMetricsForChart } from '../services/mockData';
import { MetricType } from '../types';

const GraphsPage: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState(sites[0].id);
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('load');
  const [timeRange, setTimeRange] = useState(7);
  
  const metrics: { value: MetricType; label: string }[] = [
    { value: 'load', label: 'Page Load Time' },
    { value: 'fcp', label: 'First Contentful Paint' },
    { value: 'lcp', label: 'Largest Contentful Paint' },
    { value: 'cls', label: 'Cumulative Layout Shift' },
    { value: 'fid', label: 'First Input Delay' },
    { value: 'ttfb', label: 'Time to First Byte' }
  ];

  const chartData = getMetricsForChart(selectedSite, selectedMetric, timeRange);

  return (
    <Layout>
      <div className="fade-in">
        <DashboardHeader 
          title="Performance Graphs"
          description="Visualize performance metrics over time"
          showExport={true}
        />
        
        <div style={{padding:6}} className="bg-white rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="form-group">
              <label htmlFor="site">Website</label>
              <select 
                id="site"
                value={selectedSite}
                onChange={(e) => setSelectedSite(e.target.value)}
                className="w-full"
              >
                {sites.map(site => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="metric">Metric</label>
              <select
                id="metric"
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value as MetricType)}
                className="w-full"
              >
                {metrics.map(metric => (
                  <option key={metric.value} value={metric.value}>
                    {metric.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timeRange">Time Range</label>
              <select
                id="timeRange"
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="w-full"
              >
                <option value={7}>Last 7 days</option>
                <option value={14}>Last 14 days</option>
                <option value={30}>Last 30 days</option>
              </select>
            </div>
          </div>
          
          <PerformanceChart 
            data={chartData} 
            title={metrics.find(m => m.value === selectedMetric)?.label || ''} 
            height={400}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
            <div className="space-y-4">
              <p>
                Based on the collected data, here are some insights about your website's performance:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your average page load time is <strong>2.3s</strong>, which is better than 65% of similar websites.</li>
                <li>Mobile performance is <strong>18% slower</strong> than desktop, which suggests optimizations for mobile devices might be needed.</li>
                <li>First Contentful Paint times have <strong>improved by 12%</strong> over the past 7 days.</li>
                <li>Cumulative Layout Shift scores are <strong>good</strong> across all pages, indicating stable visual experience.</li>
              </ul>
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="space-y-4">
              <p>
                Here are some recommendations to improve performance:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Optimize image loading by implementing lazy loading for below-the-fold images.</li>
                <li>Reduce JavaScript bundle size by implementing code splitting and tree shaking.</li>
                <li>Implement a Content Delivery Network (CDN) to reduce latency for global users.</li>
                <li>Consider server-side rendering for important landing pages to improve First Contentful Paint.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GraphsPage;