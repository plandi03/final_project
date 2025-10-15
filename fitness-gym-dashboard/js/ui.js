// UI Module - Manages navigation and UI components
import { DashboardManager } from './dashboard.js';

export const UIManager = {
    // Initialize UI
    init() {
        this.setupNavigation();
        this.setupWorkoutForm();
        this.setCurrentDate();
    },
    
    // Set current date in dashboard
    setCurrentDate() {
        const dateElement = document.getElementById('currentDate');
        if (dateElement) {
            const today = new Date();
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            dateElement.textContent = today.toLocaleDateString('en-US', options);
        }
    },
    
    // Setup navigation tabs
    setupNavigation() {
        const tabButtons = document.querySelectorAll('.nav-link[data-section]');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionName = e.currentTarget.dataset.section;
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
        document.querySelectorAll('.nav-link[data-section]').forEach(btn => {
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

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                    this.showAlert('Workout saved successfully!', 'success');
                    workoutForm.reset();
                }
            });
        }
    },
    
    // Show Bootstrap toast alert
    showAlert(message, type = 'success') {
        // Remove existing alerts
        const existingAlerts = document.querySelectorAll('.toast-alert');
        existingAlerts.forEach(alert => alert.remove());

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3 shadow-lg toast-alert`;
        alertDiv.style.zIndex = '9999';
        alertDiv.style.minWidth = '300px';
        alertDiv.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2 fs-5"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        document.body.appendChild(alertDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => alertDiv.remove(), 300);
        }, 3000);
    },
    
    // Show loading state
    showLoading(containerId) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 text-muted">Loading...</p>
                </div>
            `;
        }
    },
    
    // Show error message
    showError(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-danger" role="alert">
                        <i class="bi bi-exclamation-triangle me-2"></i>
                        ${message}
                    </div>
                </div>
            `;
        }
    }
};