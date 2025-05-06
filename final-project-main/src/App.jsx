import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <GoogleOAuthProvider clientId="262796229480-barh86ehugq8vjos2tk43t6ini00jtha.apps.googleusercontent.com">
      <LoginPage />
    </GoogleOAuthProvider>
  );
}

export default App;