/**
 * 게시글 상세보기(내용 보기) 페이지
 */

import { sections } from "../lib/sections";
import { useEffect, useState } from "react";
import { loginCheck } from "../lib/loginCheck";
import { CssBaseline, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import { getBoardTypeFromUrl } from "../lib/getBoardTypeFromUrl";
import { useParams } from "react-router-dom";
import axios from "axios";
import { width } from "@mui/system";

const theme = createTheme();

export default function Board(props) {
  const { id } = useParams();

  const [loginStatus, setLoginStatus] = useState(false);
  const [boardContent, setBoardContent] = useState([]);

  const boardType = getBoardTypeFromUrl(window.location.href);
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  useEffect(() => {
    axios
      .get(boardType + "/" + id)
      .then((res) => {
        console.log(res.data);
        setBoardContent(res.data);
      })
      .catch((err) => {
        alert("게시글 불러오기에 실패하였습니다. 다시 시도 해 주세요.");
      });

    setLoginStatus(loginCheck());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="내책상자랑하기"
          sections={sections}
          loginStatus={loginStatus}
          logoutTrigger={setLoginStatus}
        />
        <MainFeaturedPost post={mainFeaturedPost} />
        <main>
          <Grid container spacing={0} paddingLeft="20px" marginBottom="30px">
            <Typography className="board-title" variant="h3" fontSize="35px">
              제목: {boardContent.title}
            </Typography>
          </Grid>
          <Grid container spacing={0} paddingLeft="20px">
            <img
              src={boardContent.image}
              alt="image of this post"
              style={{
                width: "65%",
                height: "auto",
                marginBottom: "15px",
              }}
            />
          </Grid>
          <Grid container spacing={0} paddingLeft="20px">
            <Typography
              className="board-description"
              variant="body1"
              fontSize="20px"
            >
              {boardContent.description}
            </Typography>
          </Grid>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
