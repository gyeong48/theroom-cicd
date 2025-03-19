import axios from "axios"

const host = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${host}/api/account`
axios.defaults.withCredentials = true;

export const postLogin = async (body) => {
    const header = { headers: { "Content-Type": "x-www-form-urlencoded" } };
    const res = await axios.post(`${baseUrl}/login`, body, header);
    return res.data;
}

export const getAuth = async () => {
    const res = await axios.get(`${baseUrl}/auth`);
    return res.data;
}

export const getLogout = async () => {
    const res = await axios.get(`${baseUrl}/logout`);
    return res.data;
}

export const modifyAccount = async (body) => {
    const header = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put(`${baseUrl}/modify`, body, header);
    return res.data;
}