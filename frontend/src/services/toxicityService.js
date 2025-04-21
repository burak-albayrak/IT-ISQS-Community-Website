import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

export const checkCommentToxicity = async (text) => {
    try {
        const response = await axios.post(`${API_URL}/comments/check-toxicity`, { text });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error checking comment toxicity');
    }
}; 