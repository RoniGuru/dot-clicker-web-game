import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages.tsx/Home';

import { store } from './state/store';
import { AuthProvider } from './auth/authProvider';
import RootLayout from './components/layout';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/user"
            element={
              <AuthProvider>
                <RootLayout>
                  <Home />
                </RootLayout>
              </AuthProvider>
            }
          />

          <Route
            path="/"
            element={
              <RootLayout>
                <Home />
              </RootLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
