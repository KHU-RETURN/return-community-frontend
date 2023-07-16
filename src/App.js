import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/globalStyle';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>

  );
}

export default App;
