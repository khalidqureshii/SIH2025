import React from "react";

const FieldWrap: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
);

export default FieldWrap;
