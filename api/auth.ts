import axios from 'axios';

// Define backend base URL
const API_BASE_URL = 'http://localhost:8080/pg/api';

export const apiClient = async (
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
) => {
    try {
        let options: {
            method: 'GET' | 'POST' | 'PUT' | 'DELETE';
            url: string;
            headers: Record<string, string>;
            data?: any; // ✅ Explicitly add 'data' property
        } = {
            method,
            url: `${API_BASE_URL}${endpoint}`,
            headers: {},
        };

        // Handle FormData & JSON
        if (body) {
            if (body instanceof FormData) {
                options.data = body;
                // Axios will automatically set the correct 'Content-Type' for FormData
            } else {
                options.data = JSON.stringify(body);
                options.headers['Content-Type'] = 'application/json';
            }
        }

        // Send request
        const response = await axios(options);
        return response.data; // ✅ Ensure response data is returned
    } catch (error: any) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : error;
    }
};

export default apiClient;
