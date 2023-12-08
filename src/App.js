import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import RootLayout from './pages/Root';
import HomePage from './pages/Home';
import FeedsPage from './pages/Feeds';
import FarmsPage from './pages/Farms';
import HelpCenterPage from './pages/Help';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
      <Route
        path="/"
        element={<RootLayout />}
      >
        <Route path="home" element={<HomePage />} />
        <Route path="feed" element={<FeedsPage />} />
        <Route path="farms" element={<FarmsPage />} />
        <Route path="help" element={<HelpCenterPage />} />
      </Route>
  ));
  return (
    <RouterProvider router={router} />
  );
}

export default App;
