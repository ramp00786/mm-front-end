    const API_URL = "https://monsoon-mission.tropmet.res.in";

    // Utility function to handle API fetches with fallback
    export const fetchData = async (endpoint) => {
        try {
            const response = await fetch(API_URL + endpoint);
            if (!response.ok) {
                console.error('now')
                console.error(API_URL+endpoint);
                console.error(`API Error: ${endpoint} - ${response.statusText}`);
                return [];
            }
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error(`Fetch Error: ${endpoint} - ${error.message}`);
            return [];
        }
    };