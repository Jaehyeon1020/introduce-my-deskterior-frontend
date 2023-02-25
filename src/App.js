import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./routes/SignUp";
import SignIn from "./routes/SignIn";
import DeskteriorBoards from "./routes/DeskteriorBoards";
import HoneyItemBoards from "./routes/HoneyItemBoards";
import QuestionBoards from "./routes/QuestionBoards";
import axios from "axios";
import Board from "./routes/Board";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/deskteriors" />} />
        <Route path="/deskteriors" element={<DeskteriorBoards />} />
        <Route path="/deskteriors/:id" element={<Board />} />
        <Route path="/honeyitems" element={<HoneyItemBoards />} />
        <Route path="/honeyitems/:id" element={<Board />} />
        <Route path="/questions" element={<QuestionBoards />} />
        <Route path="/questions/:id" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user/:id" element={<h1>유저 정보 페이지</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
