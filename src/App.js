import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/globalStyle';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Diary from './pages/Diary';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </>

  );
}

export default App;
