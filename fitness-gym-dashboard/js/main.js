import { AuthManager } from './auth.js';
import { DashboardManager } from './dashboard.js';
import { UIManager } from './ui.js';
import { ExerciseManager } from './exercise.js';
import { NutritionManager } from './nutrition.js';
import { API_CONFIG } from '../config/api-config.js';

// Set cross-references to avoid circular dependency
AuthManager.setDashboardManager(DashboardManager);
DashboardManager.setAuthManager(AuthManager);

// Initialize UI and Auth
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    UIManager.init();
    AuthManager.init();
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
    const currentUser = AuthManager.getCurrentUser();
    if (currentUser) {
        DashboardManager.refresh();
    }
});