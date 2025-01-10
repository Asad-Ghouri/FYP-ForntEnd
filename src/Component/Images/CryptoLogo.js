import React from 'react';

const CryptoLogo = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="cryptoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#00B4DB', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#0083B0', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="45" fill="#2D3748" />
    <path
      d="M50 10
         A40 40 0 1 1 49.999 10
         M50 20
         A30 30 0 1 0 50.001 20
         M35 40
         L65 40
         A15 15 0 1 1 65 60
         L35 60
         M50 35
         L50 65"
      stroke="url(#cryptoGradient)"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

export default CryptoLogo;
