import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import SWTDashboard from "./pages/SwtDashboard";
import CITDashboard from "./pages/CitDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected route */}
        <Route
          path="/gst"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/swt"
          element={
            <ProtectedRoute>
              <SWTDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cit"
          element={
            <ProtectedRoute>
              <CITDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;