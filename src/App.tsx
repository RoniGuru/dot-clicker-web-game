import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages.tsx/home';
import Login from './pages.tsx/login';
import RootLayout from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <RootLayout>
              <Home />
            </RootLayout>
          }
        />
        <Route
          path="/login"
          element={
            <RootLayout>
              <Login />
            </RootLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
