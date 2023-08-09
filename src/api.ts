import axios from "axios";
import md5 from "md5";
import { LOCAL_STORAGE } from "./constants";

axios.defaults.baseURL = "https://no23.lavina.tech";

axios.interceptors.request.use(
  async (config) => {
    const { key, secret }: Pick<TUser, "key" | "secret"> = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.user) || "{}"
    );
    if (config.url === "/signup") {
      // let body = JSON.parse(config.data);
      // config.headers.set("key", body.key);
      // config.headers.set("secret", body.secret);
    } else {
      const requestMethod = config.method?.toUpperCase();
      const requestPathWithQuery = config.url || "";
      console.log(config.data);

      const requestBody = config.data ? JSON.stringify(config.data) : "";

      const signStr =
        requestMethod + requestPathWithQuery + requestBody + secret;
      // Calculate the MD5 hash of the sign data
      const sign = md5(signStr);
      config.headers.set("Sign", sign);
      config.headers.set("Key", key);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const registerUser = (payload: TUser) =>
  axios.post<{ data: TUser }>("/signup", payload);

export const getMyself = () => axios.get<{ data: TUser }>("/myself");

export const getBooks = () => axios.get<IBookApiResponse>("/books");

export const createBook = (payload: Pick<IBook, "isbn">) =>
  axios.post("/books", payload);

export const deleteBook = (bookId: number) => axios.delete(`/books/${bookId}`);

export const editBook = (bookId: number, payload: Pick<IBookData, "status">) =>
  axios.patch(`/books/${bookId}`, payload);
