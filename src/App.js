import React from "react";
import BoardList from "./pages/BoardList";
import Writing from "./pages/Writing.js";
import Detail from "./pages/Detail";
import MakeGroup from "./pages/MakeGroup";
import Groups from "./pages/Groups";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Groups />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/makeGroup" element={<MakeGroup />} />
        <Route path="*" element={<div>페이지가 없습니다</div>} />
      </Routes>
    </>
  );
}
export default App;
