/**
 * 꿀템 게시판 전체 글 페이지
 */

import Blog from "../components/Blog";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function HoneyItemBoards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/honeyitems").then((res) => {
      // console.log(res); // test
      setBoards(res.data);
    });
  }, []);

  return (
    <div>
      <Blog boardType="honeyitems" boardDatas={boards} />
    </div>
  );
}
