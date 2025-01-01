import { Navigate, Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import RootLayout from "@/components/RootLayout";
import AuthLayout from "./components/AuthLayout";
import MessagesPage from "./pages/MessagesPage";
import RequireAuth from "./features/auth/RequireAuth";
import useStore from "./store/useStore";

const App = () => {
  const { isAuthenticated } = useStore();
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            isAuthenticated ? <Navigate to={"/messages"} /> : <AuthPage />
          }
        />
        <Route element={<RequireAuth />}>
          <Route element={<AuthLayout />}>
            <Route path="messages">
              <Route index element={<MessagesPage />}></Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
