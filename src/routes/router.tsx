import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home/';
import Favorites from '../pages/Favorites/';
import Profile from '../pages/Profile/';
import Header from '../components/header/header';
import { ToastContainer } from 'react-toastify';

const Router = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/profile/:id" exact component={Profile} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;