import { useAuthState } from '@extensions/store/AuthProvider';
import MainPage from '@extensions/pages/MainPage';
import LoginPage from '@extensions/pages/LoginPage';
import { RootQueryProvider } from './store/RootQueryProvider';

const App = () => {
  const { auth, isLoading } = useAuthState();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!auth.token) {
    return <LoginPage />;
  }

  console.log(`🛂 loadAuthToken = ${auth.token}`);
  return (
    <RootQueryProvider>
      <MainPage />
    </RootQueryProvider>
  );
};

export default App;
