import React from 'react';
import { Plus, Download } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  onAddClick?: () => void;
  addButtonText?: string;
  showExport?: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  description,
  onAddClick,
  addButtonText = 'Add New',
  showExport = false
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="text-gray-500 mt-1">{description}</p>}
      </div>
      
      <div className="flex gap-3 mt-4 md:mt-0 mb-6">
        {showExport && (
          <button style={{marginBottom:10}} className="flex items-center gap-2 button secondary">
            <Download size={16} />
            <span>Export</span>
          </button>
        )}
        
        {onAddClick && (
          <button style={{marginBottom:10}}
            onClick={onAddClick}
            className="flex items-center gap-2 button"
          >
            <Plus size={16} />
            <span>{addButtonText}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;