import { useAuthState } from '@extensions/store/RootProvider';
import MainPage from '@extensions/pages/MainPage';
import LoginPage from '@extensions/pages/LoginPage';

const App = () => {
  const { auth } = useAuthState();

  if (auth.token) {
    console.log(`🛂 loadAuthToken = ${auth.token}`);
    return <MainPage />;
  }

  return <LoginPage />;
};

export default App;
