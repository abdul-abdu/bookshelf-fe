import axios from "axios";
import CryptoJS from "crypto-js";
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
      const requestBody = config.data || "";
      const signData =
        requestMethod + requestPathWithQuery + requestBody + secret;
      // Calculate the MD5 hash of the sign data
      const sign = CryptoJS.MD5(signData).toString();
      config.headers.set("sign", sign);
      config.headers.set("key", key);
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

export const createBook = () => axios.post("/books", {});
