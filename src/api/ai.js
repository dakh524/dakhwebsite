const BASE_URL = 'http://localhost:5000/api';

/**
 * Summarizes the provided text using the AI backend.
 * @param {string} text - The text to summarize.
 * @returns {Promise<string>} - The summarized text.
 */
export const summarizeText = async (text) => {
  try {
    console.log('Sending summarization request to:', `${BASE_URL}/summarize`);
    
    const response = await fetch(`${BASE_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Backend Error Response:', data);
      // Throw the specific error from the backend if available
      throw new Error(data.error || `Server responded with ${response.status}: ${data.details || 'Unknown Error'}`);
    }

    return data.result;
  } catch (error) {
    console.error('Network or API Error:', error.message);
    // Categorize errors for better UI feedback
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Could not connect to the AI server. Is the backend running on port 5000?');
    }
    throw error;
  }
};
