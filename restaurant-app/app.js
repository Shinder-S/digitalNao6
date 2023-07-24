import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import restaurantsList from './components/resturantsList';
import restaurantsDetails from './components/restaurantsDetails';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={restaurantsList} />
          <Route path="/restaurants/:id" component={restaurantsDetails} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;