/**
 * 로그인 상테인지 체크
 */

import axios from "axios";

export function loginCheck() {
  try {
    axios
      .get("/auth/logincheck")
      .then((res) => {
        console.log(res);
        return true;
      })
      .catch((err) => {
        return false;
      });
  } catch (err) {
    console.log(err);
    return false;
  }
}
