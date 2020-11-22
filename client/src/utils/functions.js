import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

/**
 * @param {string} path the path for the request
 * @param {string} method The method
 * @param {object} data data needed for request
 */
export const handleRequest = (path, method, data) => {
  return axios({
    url: `${SERVER_URL}/api/v2${path}`,
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

export const openModal = (id) => {
  document.querySelector(`#${id}`).classList.add("active");
  document.querySelector(`#style-${id}`).classList.remove("closed");
  document.querySelector(`#style-${id}`).classList.add("active");
};

export const closeModal = (id) => {
  document.querySelector(`#style-${id}`).classList.replace("active", "closed");

  setTimeout(() => {
    document.querySelector(`#${id}`).classList.remove("active");
  }, 155);
};

export const closeAllModals = () => {
  const modals = document.querySelectorAll(".modal");

  modals.forEach((modal) => {
    modal.classList.remove("active");
  });
};

export const changeFoldedState = (id) => {
  const node = document.getElementById(`category-${id}`);

  if (!node) return;

  if (node.classList.contains("folded")) {
    node.classList.remove("folded");
  } else {
    node.classList.add("folded");
  }
};
