import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  mxAuto?: boolean;
  containerClassName?: boolean;
}

export function Container({
  children,
  className,
  mxAuto = true,
  containerClassName = true,
}: ContainerProps) {
  return (
    <div
      className={`p-8 ${mxAuto ? 'mx-auto' : ''} ${
        containerClassName ? containerClassName : ''
      } ${className ? className : ''}`}
    >
      {children}
    </div>
  );
}
