import axios from "axios";

/** External HTTP client shared by API wrappers and route handlers. */
export const http = axios.create({
  timeout: 12_000,
  headers: { Accept: "application/json" },
});
