import axios from "axios";

const host = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${host}/api/content`
axios.defaults.withCredentials = true;

export const getContents = async (type) => {
    const res = await axios.get(`${baseUrl}/${type}`);
    return res.data;
}

export const postContents = async (type, body) => {
    const header = { headers: { "Content-Type": "application/json" } }
    const res = await axios.post(`${baseUrl}/${type}`, body, header);
    return res.data;
}

export const deleteContent = async (type, id) => {
    const res = await axios.delete(`${baseUrl}/${type}/${id}`);
    return res.data;
}

export const postMainImages = async (body) => {
    const header = { headers: { "Content-Type": "multipart/form-data" } }
    const res = await axios.post(`${baseUrl}/main`, body, header);
    return res.data;
}

export const getMainImages = async () => {
    const res = await axios.get(`${baseUrl}/main`);
    return res.data;
}

export const getCompanyInfo = async () => {
    const res = await axios.get(`${baseUrl}/company`);
    return res.data;
}

export const postCompanyInfo = async (body) => {
    const header = { headers: { "Content-Type": "application/json" } }
    const res = await axios.post(`${baseUrl}/company`, body, header);
    return res.data;
}
