import { sections } from "../lib/sections";
import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import FeaturedPost from "../components/FeaturedPost";

const theme = createTheme();

export default function MyPage(props) {
  const { boardType, loginStatus } = props;
  const navigate = useNavigate();
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  const [deskteriorBoards, setDeskteriorBoards] = useState([]); // 이 유저가 작성한 자랑하기 게시판 글 데이터
  const [honeyItemBoards, setHoneyItemBoards] = useState([]); // 이 유저가 작성한 꿀템 게시판 글 데이터
  const [questionBoards, setQuestionBoards] = useState([]); // 이 유저가 작성한 질문 게시판 글 데이터

  const [cookies] = useCookies([]);
  const username = cookies.username;

  if (!username) {
    alert("로그인이 필요한 서비스입니다.");
    navigate("/signin");
  }

  useEffect(() => {
    axios
      .get(`/users/${username}/boards`)
      .then((res) => {
        console.log(res.data);
        setDeskteriorBoards(res.data.deskteriorBoards);
        setHoneyItemBoards(res.data.honeyItemBoards);
        setQuestionBoards(res.data.questionBoards);
      })
      .catch((err) => {
        alert("알 수 없는 에러가 발생했습니다.");
      });
  }, []);

  const outButtonHandler = (e) => {
    e.preventDefault();

    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      axios
        .delete(`/users/${username}`)
        .then((res) => {
          alert("회원 탈퇴가 완료되었습니다.");
          navigate("/");
        })
        .catch((err) => {
          alert("알 수 없는 에러가 발생하였습니다.");
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="내책상자랑하기"
          sections={sections}
          loginStatus={loginStatus}
        />
        <MainFeaturedPost post={mainFeaturedPost} />
        <main>
          <Typography variant="h3" marginBottom="30px">
            작성한 글
          </Typography>
          <Typography variant="h3" fontSize="30px" marginBottom="15px">
            자랑하기
          </Typography>
          <Grid container spacing={4}>
            {deskteriorBoards.map((post) => (
              <FeaturedPost
                key={post.title}
                post={post}
                boardType="deskteriors"
              />
            ))}
          </Grid>
          <Divider
            style={{
              marginBottom: "15px",
              marginTop: "60px",
            }}
          >
            -
          </Divider>
          <Typography variant="h3" fontSize="30px" marginBottom="15px">
            추천하기
          </Typography>
          <Grid container spacing={4}>
            {honeyItemBoards.map((post) => (
              <FeaturedPost
                key={post.title}
                post={post}
                boardType="honeyitems"
              />
            ))}
          </Grid>
          <Divider
            style={{
              marginBottom: "15px",
              marginTop: "60px",
            }}
          >
            -
          </Divider>
          <Typography variant="h3" fontSize="30px" marginBottom="15px">
            질문하기
          </Typography>
          <Grid container spacing={4}>
            {questionBoards.map((post) => (
              <FeaturedPost
                key={post.title}
                post={post}
                boardType="questions"
              />
            ))}
          </Grid>
          <Grid container marginTop="50px">
            <Grid item xs={11}></Grid>
            <Grid item>
              <Button size="medium" color="warning" onClick={outButtonHandler}>
                회원 탈퇴
              </Button>
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
