import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Blog from "./templates/blog/Blog";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/deskterior" />} />
        <Route path="/deskterior" element={<Blog />} />
        <Route
          path="/deskterior/:id"
          element={<h1>데스크테리어 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/honeyitems" element={<Blog />} />
        <Route
          path="/honeyitems/:id"
          element={<h1>꿀템 추천 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/questions" element={<Blog />} />
        <Route
          path="/questions/:id"
          element={<h1>질문 게시판 글 상세보기 페이지</h1>}
        />
        <Route path="/signup" element={<h1>회원가입 페이지</h1>} />
        <Route path="/signin" element={<h1>로그인 페이지</h1>} />
        <Route path="/user/:id" element={<h1>유저 정보 페이지</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
