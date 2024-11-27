import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to={"/SignIn"} />;
}
