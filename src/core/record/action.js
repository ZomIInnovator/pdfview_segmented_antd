import axios from "axios";

export const addRecord = async (formData) => {
  const frmData = JSON.stringify(formData);
  return (await axios.post("/api/record", { frmData })).data;
};

export const getRecordFilter = async (id) => {
  return (await axios.get(`/api/record/rec-filter/${id}`)).data;
};

export const getRecordID = async (id) => {
  return (await axios.get(`/api/record/pdf/${id}`)).data;
};

export const delRecordById = async (id) => {
  return (await axios.delete(`/api/record/${id}`)).data;
};
