import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import { store, persistor } from './state/store';

import RootLayout from './components/layout';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/user"
              element={
                <RootLayout>
                  <Home />
                </RootLayout>
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
      </PersistGate>
    </Provider>
  );
}

export default App;
