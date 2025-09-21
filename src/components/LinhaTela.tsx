// src/components/LinhaTela.tsx
import React from "react";

interface LinhaTelaProps {
  children: React.ReactNode;
}

export const LinhaTela: React.FC<LinhaTelaProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 px-6 py-6 min-h-screen bg-gray-50">
      {children}
    </div>
  );
};
