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

const theme = createTheme();

export default function Blog(props) {
  const { boardType, boardDatas, loginStatus, logoutTrigger } = props;
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
          logoutTrigger={logoutTrigger}
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
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
