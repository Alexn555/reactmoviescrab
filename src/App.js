import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import MoviesListPage from './pages/movies-list-page';

class App extends Component {
    render() {
      return (
          <Container>
            <div className="ui two item menu">
              <NavLink className="item" activeClassName="active" exact to="/">Movies list</NavLink>
            </div>
            <Route exact path="/" component={MoviesListPage}/>
          </Container>
      );
   }
}

export default App;
