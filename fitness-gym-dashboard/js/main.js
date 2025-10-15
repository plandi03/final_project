// Main Application Entry Point
// Initializes all modules and manages app lifecycle

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    AuthManager.init();
    UIManager.init();
    ExerciseManager.init();
    NutritionManager.init();

    console.log('🏋️ Fitness & Gym Progress Dashboard initialized!');
    console.log('📊 Demo mode:', API_CONFIG.demoMode);
    
    if (API_CONFIG.demoMode) {
        console.log('⚠️ Using demo data. Configure API keys in config/api-config.js to use real APIs.');
    }
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    // Refresh current view
    const currentUser = AuthManager.getCurrentUser();
    if (currentUser) {
        DashboardManager.refresh();
    }
});