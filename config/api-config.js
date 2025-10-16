import { API_CONFIG } from '../config/api-config.js'; // adjust path as needed

// API Configuration
export const API_CONFIG = {
    // ExerciseDB API Configuration
    exerciseDB: {
        baseUrl: 'https://exercisedb.p.rapidapi.com',
        apiKey: 'a69b93d161mshdb7f5dd061c3fb6p1ec506jsn36c5df9907e2', // Replace with your RapidAPI key
        headers: {
            'X-RapidAPI-Key': 'a69b93d161mshdb7f5dd061c3fb6p1ec506jsn36c5df9907e2',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    },
    
    // Spoonacular API Configuration
    spoonacular: {
        baseUrl: 'https://api.spoonacular.com',
        apiKey: 'b448cb0d872e4dd1b9af299e4e7e8e50', // Replace with your Spoonacular API key
    },
    
    // Demo mode (set to false when using real APIs)
    demoMode: true
};