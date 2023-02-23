import Blog from "../components/Blog/Blog";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeskteriorBoards() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/deskteriors").then((res) => {
      // console.log(res); // test
      setBoards(res.data);
    });
  }, []);

  return (
    <div>
      <Blog boardType="deskterior" boardDatas={boards} />
    </div>
  );
}
