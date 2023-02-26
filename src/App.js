import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import DeskteriorBoards from "./routes/DeskteriorBoards";
import HoneyItemBoards from "./routes/HoneyItemBoards";
import QuestionBoards from "./routes/QuestionBoards";
import axios from "axios";
import Board from "./routes/Board";
import NewBoard from "./routes/NewBoard";
import { useAsync } from "react-async";
import { loginCheck } from "./lib/loginCheck";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  const { data: isLogin } = useAsync({
    promiseFn: loginCheck,
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/deskteriors" />} />

        {/* 데스크테리어 게시판 */}
        <Route path="/deskteriors" element={<DeskteriorBoards />} />
        <Route path="/deskteriors/:id" element={<Board />} />
        <Route
          path="/deskteriors/new"
          element={<NewBoard boardType="deskteriors" loginStatus={isLogin} />}
        />

        {/* 꿀템 추천 게시판 */}
        <Route path="/honeyitems" element={<HoneyItemBoards />} />
        <Route path="/honeyitems/:id" element={<Board />} />
        <Route
          path="/honeyitems/new"
          element={<NewBoard boardType="honeyitems" loginStatus={isLogin} />}
        />

        {/* 질문 게시판 */}
        <Route path="/questions" element={<QuestionBoards />} />
        <Route path="/questions/:id" element={<Board />} />
        <Route
          path="/questions/new"
          element={<NewBoard boardType="questions" loginStatus={isLogin} />}
        />

        {/* 로그인, 회원가입 */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* 유저 정보 */}
        <Route path="/user/:id" element={<h1>유저 정보 페이지</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
