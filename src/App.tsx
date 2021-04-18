import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ContextProvider } from './contexts/dataContext';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import { CATEGORIES_PAGE_URL, INDEX, PRODUCTS_PAGE_URL } from './utils/constants';

function App() {
  return (
    <Router>
      <ContextProvider>


        <Switch>
          <Route path={PRODUCTS_PAGE_URL}>
            <ProductPage />
          </Route>

          <Route path={CATEGORIES_PAGE_URL}>
            <CategoryPage />
          </Route>

          <Route path={INDEX}>
            <CategoryPage />
          </Route>


        </Switch>
      </ContextProvider>

    </Router>
  );
}

export default App;
