import './default.scss';
import { Route, Switch } from 'react-router-dom';

// layouts
import MainLayout from './layouts/MainLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import HomeLayout from './layouts/HomeLayout';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomeLayout>
              <Homepage />
            </HomeLayout>
          )}
        />
        <Route
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
