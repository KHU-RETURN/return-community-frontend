import { Route, Routes } from 'react-router';
import GlobalStyle from './styles/globalStyle';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Diary from './pages/Diary';
import DiaryDetail from './pages/DiaryDetail';

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/diary" element={<Diary />} />
        <Route path={"/diary/:postId"} element={<DiaryDetail />} />
      </Routes>
    </>

  );
}

export default App;
