import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './routes';

import GlobalStyle from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
