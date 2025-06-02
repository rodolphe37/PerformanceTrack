import React from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Site } from '../../types';

interface SiteCardProps {
  site: Site;
  onClick: (site: Site) => void;
}

const SiteCard: React.FC<SiteCardProps> = ({ site, onClick }) => {
  const getStatusIcon = () => {
    switch (site.status) {
      case 'active':
        return <CheckCircle size={18} className="text-success-500" />;
      case 'inactive':
        return <AlertTriangle size={18} className="text-warning-500" />;
      case 'error':
        return <XCircle size={18} className="text-error-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (site.status) {
      case 'active':
        return 'Active';
      case 'inactive':
        return 'Inactive';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  return (
    <div 
      className="card cursor-pointer" 
      onClick={() => onClick(site)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold mb-0">{site.name}</h3>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="flex items-center text-gray-500 mb-4 text-sm">
        <ExternalLink size={14} className="mr-2" />
        <a 
          href={site.url} 
          className="truncate hover:text-primary-500"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {site.url}
        </a>
      </div>
      
      <div className="flex justify-between items-center mt-6 text-sm">
        <span className="text-gray-500">Added {new Date(site.createdAt).toLocaleDateString()}</span>
        <button className="text-white hover:text-primary-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default SiteCard;