import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  width?: number;
  height?: number;
}

export const Loader: React.FC<LoadingOverlayProps> = ({ isLoading, width, height }) => {
  if (!isLoading) return null;

  const svgStyle: React.CSSProperties = {
    width: width || '50px',
    height: height || '50px',
  };

  const overlayStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
  };

  return (
    <div style={overlayStyle}>
      <svg style={svgStyle} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" stroke="#4fa94d" strokeWidth="5" fill="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};
