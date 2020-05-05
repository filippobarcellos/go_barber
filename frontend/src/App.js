import React from 'react';

import AppProvider from './context';

import GlobalStyle from './styles/global';

import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <GlobalStyle />
      <AppProvider>
        <SignIn />
      </AppProvider>
    </>
  );
}

export default App;
