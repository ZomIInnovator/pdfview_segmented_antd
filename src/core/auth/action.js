import axios from "axios";

export const loginAction = async (formData) => {
  const frmData = JSON.stringify(formData);
  return await axios.post("/api/auth/login", { frmData });
};

export const updateUser = async (formData) => {
  const frmData = JSON.stringify(formData);
  return await axios.post("/api/auth/edit", { frmData }).data;
};
