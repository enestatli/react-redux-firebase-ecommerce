import { useEffect, useState } from 'react';

import './default.scss';
import { Redirect, Route, Switch } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils';

// layouts
import MainLayout from './layouts/MainLayout';
import HomeLayout from './layouts/HomeLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser(null);
    });
    return () => {
      authListener();
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <HomeLayout currentUser={currentUser}>
              <Homepage />
            </HomeLayout>
          )}
        />
        <Route
          path="/registration"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            )
          }
        />
        <Route
          path="/login"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <MainLayout>
                <Login />
              </MainLayout>
            )
          }
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
