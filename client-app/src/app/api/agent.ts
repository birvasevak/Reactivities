import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/Activity";

const sleep = (delay: number) => {
  return new Promise((resolve: any) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(async (response: any) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log("error", error);
    return await Promise.reject(error);
  }
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
};

const agents = {
  Activities,
};

export default agents;
