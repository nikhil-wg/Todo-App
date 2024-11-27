import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import TodoApp from "./components/Todo";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <TodoApp />
            </ProtectedRoute>
          }
        />

        {/* Redirect to SignIn */}
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}

export default App;
