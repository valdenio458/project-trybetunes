import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NoteFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>

        <Switch>

          <Route exact path="/profile/edit">
            <ProfileEdit />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/album/:id">
            <Album />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="*/">
            <NoteFound />
          </Route>
        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
