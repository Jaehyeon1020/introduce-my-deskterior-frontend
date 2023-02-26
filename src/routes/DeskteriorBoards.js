/**
 * 데스크테리어 게시판 전체 글 페이지
 */

import Blog from "../components/Blog";
import axios from "axios";
import { useEffect, useState } from "react";
import { loginCheck } from "../lib/loginCheck";
import { useAsync } from "react-async";

export default function DeskteriorBoards() {
  const [boards, setBoards] = useState([]);

  const { data: isLogin } = useAsync({
    promiseFn: loginCheck,
  });

  useEffect(() => {
    axios
      .get("/deskteriors")
      .then((res) => {
        setBoards(res.data);
      })
      .catch((err) => {
        alert("게시판 불러오기에 실패하였습니다. 다시 시도 해 주세요.");
      });
  }, []);

  return (
    <div>
      <Blog boardType="deskteriors" boardDatas={boards} loginStatus={isLogin} />
    </div>
  );
}
