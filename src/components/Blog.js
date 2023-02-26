import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";
import { sections } from "../lib/sections";
import { getMainFeaturedPost } from "../lib/getMainFeaturedPost";
import Button from "@mui/material/Button";

const theme = createTheme();

export default function Blog(props) {
  const { boardType, boardDatas, loginStatus } = props;
  const featuredPosts = boardDatas;
  const mainFeaturedPost = getMainFeaturedPost(boardType);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header
          title="내책상자랑하기"
          sections={sections}
          loginStatus={loginStatus}
        />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost
                key={post.title}
                post={post}
                boardType={boardType}
              />
            ))}
          </Grid>
          <Grid container marginTop="50px">
            <Grid item xs={11}></Grid>
            <Grid item>
              <Button
                variant="contained"
                size="small"
                color="success"
                href={window.location.href + "/new"}
              >
                글 작성
              </Button>
            </Grid>
          </Grid>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
