import React, { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div data-testid="layout">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
