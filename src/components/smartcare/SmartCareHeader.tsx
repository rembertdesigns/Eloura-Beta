
import React from 'react';
import { Heart } from 'lucide-react';

const SmartCareHeader = () => {
  return (
    <div className="px-2 sm:px-4 py-2 sm:py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
            <Heart className="h-4 w-4 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-0.5 sm:mb-1">Smart Care Assistant</h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-tight">Your intelligent assistant for life management</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCareHeader;
