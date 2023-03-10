import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ButtonGroup } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const { sections, title, loginStatus } = props;
  const [cookies, setCookie, deleteCookie] = useCookies([]);
  const navigate = useNavigate();

  const logoutButtonHandler = () => {
    axios.post("/auth/logout").then((res) => {
      deleteCookie("username"); // 로그아웃하면서 쿠키에 저장된 username 삭제
      navigate("/");
    });
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="left"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        {!loginStatus ? (
          <ButtonGroup color="success">
            <Button variant="contained" size="small" href="/signin">
              로그인
            </Button>
            <Button variant="contained" size="small" href="/signup">
              회원가입
            </Button>
          </ButtonGroup>
        ) : (
          <div>
            <a
              href="/mypage"
              style={{
                color: "black",
                fontSize: "15px",
                paddingRight: "10px",
              }}
            >
              {cookies.username}님 환영합니다!
            </a>
            <Button
              className="logoutButton"
              variant="contained"
              color="success"
              size="small"
              onClick={logoutButtonHandler}
            >
              로그아웃
            </Button>
          </div>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="regular"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
