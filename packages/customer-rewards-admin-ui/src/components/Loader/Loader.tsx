import React from 'react';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', // ou 'absolute' dependendo do caso de uso
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
    zIndex: 1000, // Certifique-se de que está sobre outros elementos
  };

  const loaderStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    display: 'block',
  };

  return (
    <div style={overlayStyle}>
      <svg style={loaderStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          strokeWidth="15"
          width="30"
          height="30"
          x="25"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4s"
          ></animate>
        </rect>
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          strokeWidth="15"
          width="30"
          height="30"
          x="85"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2s"
          ></animate>
        </rect>
        <rect
          fill="#FF156D"
          stroke="#FF156D"
          strokeWidth="15"
          width="30"
          height="30"
          x="145"
          y="85"
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur="2s"
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0s"
          ></animate>
        </rect>
      </svg>
    </div>
  );
};
