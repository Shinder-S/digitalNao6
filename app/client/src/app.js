import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import restaurantList from './components/restaurantList';
import restaurantScore from './components/restaurantScore';

const App = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <h1>Restaurant Reviewer</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Welcome</Link>
            </li>
            {/* Otros elementos del menú */}
          </ul>
        </nav>
        {/* Aquí puedes agregar un formulario de búsqueda, si lo deseas */}
      </header>

      {/* Cuerpo */}
      <main>
        <Switch>
          <Route exact path="/" component={restaurantList} />
          <Route path="/restaurants/:id" component={restaurantScore} />
        </Switch>
      </main>

      {/* Footer */}
      <footer>
        <div>
        Follow us on social networks:
          {/* Aquí puedes agregar los íconos y enlaces a tus redes sociales */}
        </div>
      </footer>
    </div>
  );
};

export default App;