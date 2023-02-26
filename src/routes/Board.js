/**
 * 게시글 상세보기(내용 보기) 페이지
 */

import { sections } from "../lib/sections";
import { useEffect, useState } from "react";
import { loginCheck } from "../lib/loginCheck";
import { ButtonGroup, CssBaseline, Grid, Typography } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import { getBoardTypeFromUrl } from "../lib/getBoardTypeFromUrl";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const theme = createTheme();

export default function Board(props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loginStatus, setLoginStatus] = useState(false);
  const [boardContent, setBoardContent] = useState([]);

  const boardType = getBoardTypeFromUrl(window.location.href);
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  /* 글 수정 버튼 */
  const patchButtonHandler = function () {
    // 글 수정 페이지로 연결
  };

  /* 글 삭제 버튼 */
  const deleteButtonHandler = function () {
    axios
      .delete(boardType + "/" + id)
      .then((res) => {
        alert("글이 삭제되었습니다.");
        navigate("/" + boardType);
      })
      .catch((err) => {
        alert("글을 삭제할 수 없습니다.");
      });
  };

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
          <Grid
            container
            paddingLeft="45px"
            marginBottom="30px"
            display="block"
          >
            <Typography className="board-title" variant="h3" fontSize="30px">
              제목: {boardContent.title}
            </Typography>
            <Typography align="right">
              작성자: {boardContent.authorName}
            </Typography>
            <Typography align="right">
              작성일: {boardContent.createdAt}
            </Typography>
          </Grid>
          <Grid container paddingLeft="45px" marginBottom="50px">
            <img
              src={boardContent.image}
              alt="post"
              style={{
                width: "65%",
                height: "auto",
              }}
            />
          </Grid>
          <Grid container paddingLeft="45px">
            <Typography
              className="board-description"
              variant="body1"
              fontSize="20px"
            >
              {boardContent.description}
            </Typography>
          </Grid>
          <Grid container paddingLeft="45px">
            <Grid item xs={11}></Grid>
            <Grid item>
              <ButtonGroup>
                <Button variant="text" onClick={patchButtonHandler}>
                  수정
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={deleteButtonHandler}
                >
                  삭제
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
