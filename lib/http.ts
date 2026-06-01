import axios from "axios";

/** 对外 HTTP 客户端：供 API 封装与 Route Handler 复用 */
export const http = axios.create({
  timeout: 12_000,
  headers: { Accept: "application/json" },
});
