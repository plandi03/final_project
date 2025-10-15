// API Configuration
export const API_CONFIG = {
    // ExerciseDB API Configuration
    exerciseDB: {
        baseUrl: 'https://exercisedb.p.rapidapi.com',
        apiKey: 'YOUR_RAPIDAPI_KEY_HERE', // Replace with your RapidAPI key
        headers: {
            'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY_HERE',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    },
    
    // Spoonacular API Configuration
    spoonacular: {
        baseUrl: 'https://api.spoonacular.com',
        apiKey: 'YOUR_SPOONACULAR_API_KEY_HERE', // Replace with your Spoonacular API key
    },
    
    // Demo mode (set to false when using real APIs)
    demoMode: true
};