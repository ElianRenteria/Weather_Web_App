async function loadConfig() {
    try {
        const response = await fetch('config.json');
        const config = await response.json();
        window.apiKey = config.key; // Store the API key globally
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

loadConfig();
