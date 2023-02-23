import Blog from "../components/Blog/Blog";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function QuestionBoards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/questions").then((res) => {
      // console.log(res); // test
      setBoards(res.data);
    });
  }, []);

  return (
    <div>
      <Blog boardType="question" boardDatas={boards} />
    </div>
  );
}
