import Blog from "../components/Blog/Blog";
import axios from "axios";
import { useEffect, useState } from "react";

export default function DeskteriorBoards() {
  const [boards, setBoards] = useState([]);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    axios.get("/deskteriors").then((res) => {
      setBoards(res.data);
    });

    try {
      axios
        .get("/auth/logincheck")
        .then((res) => {
          console.log(res);
          setLoginStatus(true);
        })
        .catch((err) => {
          setLoginStatus(false);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Blog
        boardType="deskterior"
        boardDatas={boards}
        loginStatus={loginStatus}
        logoutTrigger={setLoginStatus}
      />
    </div>
  );
}
