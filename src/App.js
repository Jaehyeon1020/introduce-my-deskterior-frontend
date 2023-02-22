import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import DeskteriorBoards from "./routes/DeskteriorBoards";
import HoneyItemBoards from "./routes/HoneyItemBoards";
import QuestionBoards from "./routes/QuestionBoards";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/deskterior" />} />
        <Route path="/deskterior" element={<DeskteriorBoards />} />
        <Route
          path="/deskterior/:id"
          element={<h1>데스크테리어 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/honeyitems" element={<HoneyItemBoards />} />
        <Route
          path="/honeyitems/:id"
          element={<h1>꿀템 추천 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/questions" element={<QuestionBoards />} />
        <Route
          path="/questions/:id"
          element={<h1>질문 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user/:id" element={<h1>유저 정보 페이지</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
