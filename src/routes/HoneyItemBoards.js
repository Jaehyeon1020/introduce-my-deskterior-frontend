/**
 * 꿀템 게시판 전체 글 페이지
 */

import Blog from "../components/Blog";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import { loginCheck } from "../lib/loginCheck";

export default function HoneyItemBoards() {
  const [boards, setBoards] = useState([]);

  const { data: isLogin } = useAsync({
    promiseFn: loginCheck,
  });

  useEffect(() => {
    axios
      .get("/honeyitems")
      .then((res) => {
        setBoards(res.data);
      })
      .catch((err) => {
        alert("게시판 불러오기에 실패하였습니다. 다시 시도 해 주세요.");
      });
  }, []);

  return (
    <div>
      <Blog boardType="honeyitems" boardDatas={boards} loginStatus={isLogin} />
    </div>
  );
}
