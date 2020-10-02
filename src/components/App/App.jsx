import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import TitleList from '../TitleList/TitleList';
import Header from '../Header/Header';
import Article from '../Article/Article';

import './app.scss';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Route path="/" component={TitleList} exact />
        <Route path="/article/:slug" component={Article} />
      </Router>
    </>
  );
};

export default App;
