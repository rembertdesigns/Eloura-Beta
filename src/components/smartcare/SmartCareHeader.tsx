
import React from 'react';

const SmartCareHeader = () => {
  return (
    <div className="border-b bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          🤖
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Eloura AI</h1>
          <p className="text-sm text-slate-600">Your intelligent assistant for life management and personalized guidance</p>
        </div>
      </div>
    </div>
  );
};

export default SmartCareHeader;
