import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Footer from "./Footer";

const sections = [
  { title: "자랑하기", url: "/deskterior" },
  { title: "추천하기", url: "/honeyitems" },
  { title: "질문하기", url: "/questions" },
];

const theme = createTheme();

function getMainFeaturedPost(boardType) {
  if (boardType === "deskterior") {
    return {
      title: "내 책상 자랑하기",
      description: "여러분의 책상을 자랑하세요!",
      image:
        "https://images.unsplash.com/photo-1593062096033-9a26b09da705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      imageText: "main image description",
      linkText: "",
    };
  } else if (boardType === "honeyitem") {
    return {
      title: "꿀템 추천하기",
      description: "데스크테리어 꿀템들을 추천해주세요!",
      image:
        "https://images.unsplash.com/photo-1625600243103-1dc6824c6c8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1364&q=80",
      imageText: "main image description",
      linkText: "",
    };
  } else {
    return {
      title: "질문하기",
      description: "이거 뭐에요? 궁금했던 제품을 물어보세요!",
      image:
        "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80",
      imageText: "main image description",
      linkText: "",
    };
  }
}

export default function Blog(props) {
  const { boardType, boardDatas } = props;

  const featuredPosts = boardDatas;

  const mainFeaturedPost = getMainFeaturedPost(boardType);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="내책상자랑하기" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
        </main>
      </Container>
      <Footer title="내책상자랑하기" description="" />
    </ThemeProvider>
  );
}
