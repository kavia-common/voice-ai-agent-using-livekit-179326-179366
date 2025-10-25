import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main title', () => {
  render(<App />);
  const title = screen.getByText(/Ask about the product/i);
  expect(title).toBeInTheDocument();
});
