import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/Store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />; // redirect to login/register page
  }

  return children;
};

export default ProtectedRoute;
