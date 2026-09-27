import axios from "axios";
const API_URL = process.env.API_URL || 'http://localhost:5000/api/v1'
export default async function getDoc() {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
    
}