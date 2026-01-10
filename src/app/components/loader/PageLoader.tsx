'use client';

import React from 'react';

interface PageLoaderProps {
  isLoading: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white dark:bg-gray-700 shadow-lg animate-scaleUp">
        {/* Spinner */}
        <div className="w-6 h-6 border-2 border-primary border-t-transparent dark:border-gray-200 rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm font-medium tracking-wide text-primary dark:text-gray-200 animate-pulse">
          Loading...
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes scaleUp {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scaleUp {
          animation: scaleUp 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
