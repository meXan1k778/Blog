import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoundry from '../../containers/ErrorBoundry/ErrorBoundry'
import TitleList from '../../containers/TitleList/TitleList';
import Header from '../../containers/Header/Header';
import ArticleMain from '../../containers/Article/ArticleMain';
import store from '../../store/store';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LogInForm from '../LogInForm/LogInForm';
import ProfileMain from '../../containers/ProfileMain/ProfileMain';
import NewArticle from '../../containers/NewArticle/NewArticle';
import PrivateRoute from '../../routes/PrivateRoute';

import './app.scss';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <ErrorBoundry>
            <Switch>
              <Route path="/" component={TitleList} exact />
              <PrivateRoute path="/new-article" component={NewArticle} exact />
              <Route path="/sign-in" component={LogInForm} exact />
              <PrivateRoute path="/profile" component={ProfileMain} exact />
              <Route path="/sign-up" component={RegistrationForm} exact />
              <Route path="/article/:slug" component={ArticleMain} exact />
              <PrivateRoute path="/article/:slug/edit" component={NewArticle} />
              <Redirect to="/" />
            </Switch>
          </ErrorBoundry>
        </Router>
      </Provider>
    </>
  );
};

export default App;
