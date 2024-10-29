import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render Layout component', () => {
    render(<App />);
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  it('should render HomeContent component', () => {
    render(<App />);
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });
});
