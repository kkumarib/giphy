import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';

// const SearchBar = React.lazy(() => import('./components/SearchBar'));

const routes = [
  {
    title: "Gify Search",
    path: '/',
    component: Home,
    exact: true,
  },
  {
    title: "Gify Search",
    path: '/search',
    component: Search,
    exact: true,
  },
  {
    title: "Gify Search",
    path: '/search:id',
    component: Search,
    exact: true,
  }
]

function App() {
  return (
    <div>
    {/* <React.Suspense fallback={<div>Loading</div>} /> */}
      <BrowserRouter>
      <Switch>
        {
          routes.map( props => <Route {...props} key={props.path}/>)
        }
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
