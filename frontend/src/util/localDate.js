const now = new Date(2025, 0, 1);
const year = now.getFullYear();
const month = now.getMonth() + 1;
const date = now.getDate();

export const defaultDate = `${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`;