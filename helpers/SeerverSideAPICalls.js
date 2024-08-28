const { default: axios } = require("axios");

const BASE_URL = "https://apl.attensam.at/api/";

const axiosToken = (token) =>
  axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "/*",
      "Content-Type": "application/json",
    },
  });

export const getModulesSSR = async (token) => {
  let modules = [];

  try {
    const { data } = await axiosToken(token).get("Modules");
    modules = data;
  } catch (err) {
    console.log(err);
  }
  return modules;
};
