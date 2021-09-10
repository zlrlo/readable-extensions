import { useAuthState } from '@extensions/store/AuthProvider';
import MainPage from '@extensions/pages/MainPage';
import LoginPage from '@extensions/pages/LoginPage';
import { RootQueryProvider } from './store/RootQueryProvider';

const App = () => {
  const { auth } = useAuthState();

  if (auth.token) {
    console.log(`🛂 loadAuthToken = ${auth.token}`);
    return (
      <RootQueryProvider>
        <MainPage />
      </RootQueryProvider>
    );
  }

  return <LoginPage />;
};

export default App;
