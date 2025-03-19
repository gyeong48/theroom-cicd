import axios from "axios"

const host = process.env.REACT_APP_SERVER_URL;
const baseUrl = `${host}/api/contact`
axios.defaults.withCredentials = true;

export const postAddContact = async (body) => {
    const header = { header: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post(`${baseUrl}/add`, body, header);
    return res.data;
}

export const getContactList = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
}

export const getContactDetail = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
}

export const putModifyContact = async (id, body) => {
    const header = { header: { "Content-Type": "application/json" } };
    const res = await axios.put(`${baseUrl}/${id}/modify`, body, header);
    return res.data;
}

export const deleteContact = async (id) => {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
}

export const getDownloadFile = async (filename, originalFilename) => {
    const res = await fetch(`${baseUrl}/download/${encodeURIComponent(filename)}/${encodeURIComponent(originalFilename)}`, { method: "GET" });
    return res;
}
