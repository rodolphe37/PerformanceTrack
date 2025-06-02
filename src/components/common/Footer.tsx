import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500">
              &copy; {currentYear} PerformanceTrack. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary-500 transition-colors">
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;