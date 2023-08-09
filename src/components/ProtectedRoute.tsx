import { Navigate, useLocation } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({ isLoggedIn, children }: Props) => {
  const location = useLocation();

  if (!isLoggedIn && location.pathname !== "/sign-up") {
    return <Navigate to="/sign-up" />;
  }
  if (isLoggedIn && location.pathname === "/sign-up") {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};
