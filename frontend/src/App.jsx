import React, {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// Pages
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AddMoviePage from "./pages/AddMovie";
import EditMoviePage from "./pages/EditMovie";
import DeleteMoviePage from "./pages/DeleteMovie";
import NotFoundPage from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

// Role-Based Route Protection
const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    //a small delay to allow Redux state to update
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdminRoute && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/admin/add-movie"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <AddMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-movie/:id"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <EditMoviePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/delete-movie/:id"
          element={
            <ProtectedRoute isAdminRoute={true}>
              <DeleteMoviePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
