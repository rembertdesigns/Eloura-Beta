
import React from 'react';

const SmartCareHeader = () => {
  return (
    <div className="px-4 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
            🤖
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Smart Care Assistant</h1>
            <p className="text-sm text-gray-600">Your intelligent assistant for life management and personalized guidance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartCareHeader;
