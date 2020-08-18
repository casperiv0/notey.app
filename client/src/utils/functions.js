import axios from "axios";
const SERVER_URL = "http://192.168.0.178:3030";

/**
 * @param {string} path the path for the request
 * @param {string} method The method
 * @param {object} data data needed for request
 */
export const handleRequest = (path, method, data) => {
  return axios({
    url: `${SERVER_URL}/api/v1${path}`,
    method,
    data: data ? data : null,
    withCredentials: true,
  });
};

/**
 * @param {string} status The returned status from server
 */
export const isSuccess = (res) => {
  return res.data.status === "success";
};

export const openSidebar = (id) => {
  document.querySelector(`#${id}Active`).classList.add("active");
  document.querySelector(`#${id}`).classList.add("active");
};

export const closeSidebar = (id) => {
  document.querySelector(`#${id}Active`).classList.remove("active");
  document.querySelector(`#${id}`).classList.remove("active");
};
