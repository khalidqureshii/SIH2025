import React from "react";

const MarketLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <label className={`block text-sm font-medium text-slate-700 ${className}`}>{children}</label>
);

export default MarketLabel;
