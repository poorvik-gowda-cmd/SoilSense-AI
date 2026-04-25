import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import History from "./pages/History";
import Analytics from "./pages/Analytics";
import Auth from "./pages/Auth";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./index.css";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

function Navbar() {
  const { user, logout } = useAuth();
  
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="nav-logo">
          🌱 <span className="grad-text">SoilSense AI</span>
        </NavLink>
        {user && (
          <ul className="nav-links">
            <li><NavLink to="/"        className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Analyze</NavLink></li>
            <li><NavLink to="/history" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>History</NavLink></li>
            <li><NavLink to="/analytics" className={({isActive}) => "nav-link" + (isActive ? " active" : "")}>Analytics</NavLink></li>
            <li><button className="btn-link nav-link" onClick={logout} style={{ marginLeft: "1rem" }}>Logout</button></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/"        element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
