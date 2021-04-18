import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

const submitClick = jest.fn();

describe('renders SearchBar component', () => {

  it('should display the search value based on the prop value', () => {
    const view = render(<SearchBar searchKey="happy"/>);
    expect(view.getByRole('textbox', { name: 'Search' })).toHaveValue('happy');
  });

  it('should update the search value based on onChange', () => {
    const view = render(<SearchBar/>);
    userEvent.type(view.getByRole('textbox', { name: 'Search' }), 'smile');
    expect(view.getByRole('textbox', { name: 'Search' })).toHaveValue('smile');
  });

  it('should trigger search handler on search button click', () => {
    const view = render(<SearchBar onSubmitHandler={submitClick} searchKey="happy"/>);

    fireEvent.submit(view.getByTestId("form"));
    expect(submitClick).toHaveBeenCalledTimes(1);
  });
});
