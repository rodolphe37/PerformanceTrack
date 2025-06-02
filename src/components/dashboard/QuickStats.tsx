import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, Clock, Monitor, Zap } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-500 text-sm font-semibold">{title}</h3>
        <div className="bg-primary-100 p-2 rounded-md text-primary-500">
          {icon}
        </div>
      </div>
      
      <div className="text-2xl font-bold mb-2">{value}</div>
      
      <div className="flex items-center">
        <span className={`flex items-center ${isPositive ? 'text-success-500' : 'text-error-500'}`}>
          {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span className="ml-1">{Math.abs(change)}%</span>
        </span>
        <span className="text-gray-500 text-sm ml-2">vs last week</span>
      </div>
    </div>
  );
};

const QuickStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Average Page Load"
        value="2.3s"
        change={-12}
        icon={<Clock size={18} />}
      />
      
      <StatCard
        title="Performance Score"
        value="87"
        change={5}
        icon={<Zap size={18} />}
      />
      
      <StatCard
        title="Active Monitors"
        value="12"
        change={0}
        icon={<Monitor size={18} />}
      />
      
      <StatCard
        title="Total Sessions"
        value="28.5K"
        change={18}
        icon={<Activity size={18} />}
      />
    </div>
  );
};

export default QuickStats;