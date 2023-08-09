import React, { useEffect } from "react";
import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { pages } from "./pages";
import { useAuthStore } from "./store";
import { ProtectedRoute } from "./components";
import { getMyself } from "./api";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  console.log({ user });

  useEffect(() => {
    (async () => {
      if (!user) {
        const { data } = await getMyself();
        setUser(data.data);
      }
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      <Toaster />
      <Routes>
        {pages.map(({ component: Page, path }, index) => (
          <Route
            key={`${path}-${index}`}
            path={path}
            element={<ProtectedRoute children={<Page />} isLoggedIn={!!user} />}
          />
        ))}
      </Routes>
    </Container>
  );
};

export default App;
