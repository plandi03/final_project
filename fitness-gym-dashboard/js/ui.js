// UI Module - Manages navigation and UI components
import { DashboardManager } from './dashboard.js';

export const UIManager = {
    // ... (keep existing code but update navigation)
    
    init() {
        this.setupNavigation();
        this.setupWorkoutForm();
    },
    
    // Setup navigation tabs
    setupNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
    
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const sectionName = e.target.dataset.section;
                this.showSection(sectionName);
            });
        });
    },
    
    // Show specific section
    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
    
        // Remove active from all tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
    
        // Show selected section
        const section = document.getElementById(sectionName);
        if (section) {
            section.classList.add('active');
        }
    
        // Activate corresponding tab
        const activeTab = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
    },
    
    // Setup workout form
    setupWorkoutForm() {
        const workoutForm = document.getElementById('workoutFormElement');
    
        if (workoutForm) {
            workoutForm.addEventListener('submit', (e) => {
                e.preventDefault();
    
                const name = document.getElementById('workoutName').value;
                const exercises = document.getElementById('workoutExercises').value;
                const notes = document.getElementById('workoutNotes').value;
    
                const success = DashboardManager.saveWorkout(name, exercises, notes);
    
                if (success) {
                    alert('Workout saved successfully!');
                    workoutForm.reset();
                }
            });
        }
    },
    
    // Show loading state
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<div class="loading">Loading...</div>';
        }
    },
    
    // Show error message
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<div class="loading">${message}</div>`;
        }
    }
};