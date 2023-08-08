import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { pages } from "./pages";
import { useAuthStore } from "./store";
import { Navbar, ProtectedRoute } from "./components";
import { getMyself } from "./api";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const { user, setUser } = useAuthStore();
  console.log(user);

  useEffect(() => {
    (async () => {
      if (!user) {
        const { data } = await getMyself();
        setUser(data.data);
      }
    })();
  }, []);

  return (
    <Container maxWidth="sm">
      <Toaster />
      <Navbar />
      <Routes>
        {pages.map(({ component: Page, isProtected, path }, index) =>
          isProtected ? (
            <Route
              key={`${path}-${index}`}
              path={path}
              element={
                <ProtectedRoute children={<Page />} isLoggedIn={!!user} />
              }
            />
          ) : (
            <Route path={path} element={<Page />} key={`${path}-${index}`} />
          )
        )}
      </Routes>
    </Container>
  );
};

export default App;
