import { render, fireEvent,screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Home from '../Home';

const view = render(<Home />);

test('renders quick link in Home Page', () => {
  const linkElement = view.getByText('Trending gif');
  expect(linkElement).toBeInTheDocument();
});

test('renders search input field in Home Page', () => {
  userEvent.type(screen.getByRole('search'), 'smile');
  expect(screen.getByRole('search')).toHaveValue('smile');
});
