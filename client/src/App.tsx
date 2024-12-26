import { Route, Routes } from "react-router";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import SignUpPage from "@/pages/auth/SignUpPage";
import LogInPage from "@/pages/auth/LogInPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LogInPage />} />
      </Route>
    </Routes>
  );
};

export default App;
