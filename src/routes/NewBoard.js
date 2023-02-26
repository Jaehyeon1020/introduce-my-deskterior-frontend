import { sections } from "../lib/sections";
import { Box, CssBaseline, Grid, TextField } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";

const theme = createTheme();

export default function NewBoard(props) {
  const { boardType, loginStatus } = props;
  const navigate = useNavigate();
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const boardData = {
      title: data.get("title"),
      description: data.get("description"),
      image: data.get("image"),
    };

    console.log(boardData);

    axios
      .post(boardType, boardData, {
        // 텍스트와 이미지 함께 form-data로 넘길 때는 http 헤더의 content-type을 multipart/form-data로 설정해야 한다.
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        alert("새 글이 등록되었습니다.");
        navigate("/" + boardType);
      })
      .catch((err) => {
        alert("새 글 등록에 실패하였습니다. 다시 시도해 주세요.");
        navigate("/" + boardType);
      });
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
          <Box component="form" onSubmit={submitHandler} noValidate>
            <Grid container marginBottom="30px">
              <TextField
                fullWidth
                variant="filled"
                placeholder="제목을 입력하세요"
                size="small"
                name="title"
              />
            </Grid>
            <Grid container>
              <TextField
                multiline
                fullWidth
                variant="filled"
                minRows="15"
                maxRows="15"
                placeholder="내용을 입력하세요"
                name="description"
              />
            </Grid>
            <Grid container marginTop="30px">
              <input type="file" accept="image/*" name="image" />
            </Grid>
            <Grid container marginTop="50px">
              <Grid item xs={11}></Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  size="small"
                  type="submit"
                >
                  등록
                </Button>
              </Grid>
            </Grid>
          </Box>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
