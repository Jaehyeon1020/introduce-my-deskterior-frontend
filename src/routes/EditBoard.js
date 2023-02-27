import { sections } from "../lib/sections";
import { Box, CssBaseline, Grid, TextField } from "@mui/material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Container from "@mui/material/Container";
import MainFeaturedPost from "../components/MainFeaturedPost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";

const theme = createTheme();

export default function EditBoard(props) {
  const { boardType, loginStatus } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(boardType + "/" + id).then((res) => {
      setText(res.data.description);
    });
  }, []);

  const textChangeHandler = (e) => {
    setText(e.currentTarget.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const boardData = {
      description: data.get("description"),
    };

    /* 글 수정 시 제한사항 */
    if (
      boardData.description.length < 5 ||
      boardData.description.length > 500
    ) {
      alert("내용을 5글자 이상, 500글자 이하로 입력 해 주세요.");
      return;
    }

    axios
      .patch(boardType + "/" + id, boardData)
      .then((res) => {
        alert("글이 수정되었습니다.");
        navigate("/" + boardType + "/" + id);
      })
      .catch((err) => {
        alert("글 수정에 실패하였습니다.");
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
            <Grid container>
              <TextField
                multiline
                fullWidth
                variant="filled"
                minRows="15"
                maxRows="15"
                placeholder="내용을 입력하세요"
                name="description"
                value={text}
                onChange={textChangeHandler}
              />
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
                  수정
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
