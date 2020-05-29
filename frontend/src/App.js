import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from "./pages/SignUp";

import { store, persistor } from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SignIn />
        </PersistGate>
      </Provider>
      <GlobalStyle />
    </>
  );
}

export default App;
