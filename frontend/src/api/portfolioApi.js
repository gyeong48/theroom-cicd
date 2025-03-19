import axios from "axios"

const host = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${host}/api/portfolio`
axios.defaults.withCredentials = true;

export const postAddPortfolio = async (body) => {
    const header = { header: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(`${baseUrl}/add`, body, header);
    return res.data;
}

export const getPortfolioList = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

export const getPortfolioDetail = async (id) => {
    const res = await axios.get(`${baseUrl}/read/${id}`);
    return res.data;
}

export const getPortfolioModifyDetail = async (id) => {
    const res = await axios.get(`${baseUrl}/modify/${id}`);
    return res.data;
}

export const putModifyPortfolio = async (id, body) => {
    const header = { header: { "Content-Type": "multipart/form-data" } };
    const res = await axios.put(`${baseUrl}/modify/${id}`, body, header);
    return res.data;
}

export const deletePortfolio = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
}