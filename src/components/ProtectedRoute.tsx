import { Navigate } from "react-router-dom";

type Props = {
  isLoggedIn: boolean;
  children: JSX.Element;
};

export const ProtectedRoute = ({ isLoggedIn, children }: Props) => {
  console.log({ isLoggedIn });

  if (!isLoggedIn) {
    return <Navigate to="/sign-up" replace />;
  }
  return <>{children}</>;
};
