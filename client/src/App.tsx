import { Route, Routes } from "react-router";
import AuthPage from "./pages/AuthPage";
import RootLayout from "@/components/RootLayout";
import AuthLayout from "./components/AuthLayout";
import MessagesPage from "./pages/MessagesPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<AuthPage />} />
        <Route element={<AuthLayout />}>
          <Route path="messages">
            <Route index element={<MessagesPage />}></Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
