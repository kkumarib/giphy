import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react'
import { Router } from 'react-router-dom';
import Search from '../pages/Search';

describe('render Search page', () => {
    let view;

    beforeEach(()=> {
        const history = createMemoryHistory();
        view = render(<Router history={history}><Search /></Router>);
        history.push({pathname:"/search", search:"?search=smile"});
    });

    it('should display searchBar', () => {
        const searchBar = view.getByTestId("form");
        expect(searchBar).toBeInTheDocument();
    });

    it('should not disply recent search list on onload', () => {
        const recentSearch = view.queryByText("Recent search");
        expect(recentSearch).toBeNull();
    });

    it('should display recent search, after performing 2 searches', () => {
        let recentSearch = view.queryByText("Recent search :");

        // First search
        userEvent.type(view.getByRole('textbox', { name: 'Search' }), 'smile');
        fireEvent.submit(view.getByTestId("form"));
        expect(recentSearch).toBeNull();

        // Second search
        userEvent.type(view.getByRole('textbox', { name: 'Search' }), 'happy');
        fireEvent.submit(view.getByTestId("form"));
        recentSearch = view.getByText("Recent search :");
        expect(recentSearch).toBeInTheDocument();
    });

    it('should display only 5 recent searched items', () => {
        const list = ["happy", "funny", "bunny", "sunny", "cat", "dog"];

        list.map(item => {
            userEvent.type(view.getByRole('textbox', { name: 'Search' }), item);
            fireEvent.submit(view.getByTestId("form"));
        })

        const searchItems= view.getAllByLabelText('recent');
        expect(searchItems.length).toBe(5);
    });
});
