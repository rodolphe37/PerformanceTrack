import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickStats from '../components/dashboard/QuickStats';
import SiteCard from '../components/dashboard/SiteCard';
import { Site } from '../types';
import { sites, getMetricsForChart } from '../services/mockData';
import PerformanceChart from '../components/graphs/PerformanceChart';

const DashboardPage: React.FC = () => {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);

  const handleAddSite = () => {
    alert('This feature would open a modal to add a new site to monitor.');
  };

  const handleSiteClick = (site: Site) => {
    setSelectedSite(site);
  };

  const handleBackToSites = () => {
    setSelectedSite(null);
  };

  if (selectedSite) {
    const loadTimeData = getMetricsForChart(selectedSite.id, 'load');
    const fcpData = getMetricsForChart(selectedSite.id, 'fcp');
    
    return (
      <Layout>
        <div className="fade-in">
          <button 
            onClick={handleBackToSites}
            className="flex items-center text-gray-600 hover:text-primary-500 mb-6"
          >
            ← Back to all sites
          </button>
          
          <DashboardHeader 
            title={selectedSite.name}
            description={selectedSite.url}
            showExport={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Page Load Time</h3>
              <PerformanceChart data={loadTimeData} title="Load Time (ms)" height={250} />
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">First Contentful Paint</h3>
              <PerformanceChart data={fcpData} title="FCP (ms)" height={250} />
            </div>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
            <div className="text-center text-gray-500 py-12">
              More detailed analytics would be shown here for a production application.
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="fade-in">
        <DashboardHeader 
          title="Dashboard"
          description="Monitor your websites' performance"
          onAddClick={handleAddSite}
          addButtonText="Add Website"
        />
        
        <QuickStats />
        
        <h2 className="text-xl font-bold mb-4">Your Websites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sites.map(site => (
            <SiteCard 
              key={site.id} 
              site={site} 
              onClick={handleSiteClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;