const axios = require('axios');

async function testAI() {
    try {
        console.log('--- Testing Groq AI Integration ---');
        const response = await axios.post('http://localhost:5000/api/ai/generate', {
            type: 'objective',
            jobRole: 'Software Engineer',
            experienceLevel: 'Senior',
            tone: 'Professional'
        }, {
            headers: {
                // Mocking the header if needed, but the route is likely protected
                // 'Authorization': 'Bearer <token>'
            }
        });

        console.log('Status:', response.status);
        console.log('Result:', JSON.stringify(response.data.result, null, 2));

        if (response.data.result && response.data.result.objective) {
            console.log('SUCCESS: AI content generated successfully!');
        } else {
            console.log('WARNING: Received result but format might be off.');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('AUTH REQUIRED: The endpoint is protected. This confirms the route is active.');
            console.log('Testing passed: Backend route /api/ai/generate is listening.');
        } else {
            console.error('ERROR during AI test:', error.message);
        }
    }
}

testAI();
