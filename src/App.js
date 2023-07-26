import { Route, Routes } from "react-router";
import GlobalStyle from "./styles/globalStyle";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import GoogleRedirect from "./components/GoogleRedirect";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/signin"
          element={<SignIn />}
        />
        <Route
          path="/code"
          element={<GoogleRedirect />}
        />
      </Routes>
    </>
  );
};

export default App;
