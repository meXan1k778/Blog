import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import TitleList from '../TitleList/TitleList';
import Header from '../Header/Header';
import Article from '../Article/Article';
import store from '../../store/store';
import RegistrationForm from '../Registration-form/Registration-form';
import LogInForm from '../Registration-form/LogIn-form';
import Profile from '../Profile/Profile';
import NewArticle from '../New-article/New-article';
import Edit from '../Edit/Edit';

import './app.scss';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />

          <Route path="/" component={TitleList} exact />
          <Route path="/new-article" component={NewArticle} exact />
          <Route path="/sign-in" component={LogInForm} exact />
          <Route path="/profile" component={Profile} exact />
          <Route path="/sign-up" component={RegistrationForm} exact />
          <Route path="/article/:slug" component={Article} exact />
          <Route path="/article/:slug/edit" component={Edit} />
        </Router>
      </Provider>
    </>
  );
};

export default App;
