/**
 * 로그인 상테인지 체크
 */

import axios from "axios";

export async function loginCheck() {
  try {
    const result = await axios.get("/auth/logincheck");
    return true;
  } catch (err) {
    return false;
  }
}
