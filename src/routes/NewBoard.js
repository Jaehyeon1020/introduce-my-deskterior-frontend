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

    /* 글 작성 시 제한사항 */
    if (!boardData.title || !boardData.description || !boardData.image.size) {
      alert("글 제목, 내용, 이미지는 필수 입력 항목입니다.");
      return;
    } else if (boardData.title.length < 2 || boardData.title.length > 50) {
      alert("제목을 2글자 이상, 50글자 이하로 입력 해 주세요.");
      return;
    } else if (
      boardData.description.length < 5 ||
      boardData.description.length > 500
    ) {
      alert("내용을 5글자 이상, 500글자 이하로 입력 해 주세요.");
      return;
    } else if (boardData.image.size > 5 * 1024 * 1024) {
      alert("5MB 이하 용량의 이미지만 업로드가 가능합니다.");
      return;
    }

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
