const API_URL = 'http://localhost:5000/api';

const getAuthToken = () => {
    // We will assume the token is stored in localStorage after login
    // If we haven't implemented login persistence yet, this will return null
    return localStorage.getItem('token');
};

export const generateAIContent = async (params) => {
    try {
        const token = getAuthToken();
        const response = await fetch(`${API_URL}/ai/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate AI content');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw error;
    }
};
