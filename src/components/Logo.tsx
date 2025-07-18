import React from 'react';

import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
}

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md', 
  variant = 'full' 
}) => {
  const navigate = useNavigate();

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  const LogoIcon = () => (
    <svg
      viewBox="0 0 48 48"
      className={`${sizeClasses[size]} w-auto`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>
      
      {/* Main logo shape - modern building/house hybrid */}
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="8"
        fill="url(#logoGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Building structure */}
      <path
        d="M14 32V20L24 14L34 20V32H30V24H26V32H22V24H18V32H14Z"
        fill="white"
        fillOpacity="0.95"
      />
      
      {/* Roof accent */}
      <path
        d="M24 14L34 20H30L24 16.5L18 20H14L24 14Z"
        fill="white"
        fillOpacity="0.8"
      />
      
      {/* Door */}
      <rect
        x="22"
        y="28"
        width="4"
        height="4"
        fill="url(#logoGradient)"
        rx="0.5"
      />
      
      {/* Windows */}
      <rect x="16" y="22" width="2" height="2" fill="url(#logoGradient)" rx="0.3" />
      <rect x="30" y="22" width="2" height="2" fill="url(#logoGradient)" rx="0.3" />
    </svg>
  );

  const LogoText = ({ textSize = 'text-xl' }: { textSize?: string }) => (
    <div className={`font-bold ${textSize} tracking-tight`}>
      <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
        Parlor
      </span>
      <span className="ml-1 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
        Real Estate
      </span>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={className}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        <LogoText textSize={size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'} />
      </div>
    );
  }

  return (
    <div 
      className={`flex items-center space-x-3 cursor-pointer ${className}`}
      onClick={() => navigate('/')}
    >
      <LogoIcon />
      <LogoText textSize={size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : size === 'xl' ? 'text-3xl' : 'text-xl'} />
    </div>
  );
};

export default Logo;