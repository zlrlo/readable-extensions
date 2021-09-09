import { useAuthState } from './store/RootProvider';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  const { auth } = useAuthState();

  if (auth.token) {
    console.log(`🛂 loadAuthToken = ${auth.token}`);
    return <MainPage />;
  }

  return <LoginPage />;
};

export default App;
