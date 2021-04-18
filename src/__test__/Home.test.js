import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../App';

describe('renders Home page', () => {
  let view;

  beforeEach(() => {
    view = render(<Home />);
  })

  it('should display quick link of trending button', () => {
    const button = view.getByText("Trending gif");
    expect(button).toBeInTheDocument();
  });

  it('should trigger redirection on trending quick link button click', async() => {
    expect(window.location.pathname).toBe("/");
    await fireEvent.click(view.getByText("Trending gif"));
    expect(window.location.pathname).toBe("/search");
    expect(window.location.search).toBe("?trending=true");
  });

  it('should trigger redirection on search click', async() => {
    userEvent.type(view.getByRole('textbox', { name: 'Search' }), 'smile');
    await fireEvent.submit(view.getByTestId("form"));
    expect(window.location.pathname).toBe("/search");
    expect(window.location.search).toBe("?search=smile");
  })
});
