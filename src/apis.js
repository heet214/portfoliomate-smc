const getBaseUrl = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error("VITE_API_URL is not defined in your .env file!");
      return "http://127.0.0.1:5001/smc-portfoliomate/us-central1/apiHandler";
    }
    return apiUrl;
  };
  
  const apiCall = async (type, data) => {
    const baseUrl = getBaseUrl();
    const payload = { type, data };
  
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        // credentials: 'include',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error (${response.status})`);
      }
      return response.json();
  
    } catch (error) {
      console.error(`Error in apiCall for type "${type}":`, error);
      throw error;
    }
  };
  
  /**
   * Logs a user in. The backend will set a cookie upon success.
   * @returns {Promise<Object>} - The user profile data.
   */
  export const loginUser = (credentials) => {
    return apiCall('login', credentials);
  };
  
  /**
   * Verifies the current session using the browser's cookie.
   * @returns {Promise<Object>} - The user profile data if the session is valid.
   */
  export const verifySession = () => {
    return apiCall('verifySession', {});
  };
  
  /**
   * Logs the user out by clearing the session cookie on the backend.
   */
  export const logoutUser = () => {
    return apiCall('logout', {});
  };
  