// Dashboard Module - Manages dashboard display and statistics
import { StorageManager } from './storage.js';
import { ChartsManager } from './charts.js';

// Forward declaration for AuthManager to avoid circular dependency
let AuthManager;

export const DashboardManager = {
    currentUser: null,
    
    quotes: [
        "The only bad workout is the one that didn't happen.",
        "Success starts with self-discipline.",
        "Your body can stand almost anything. It's your mind you have to convince.",
        "Don't wish for it, work for it.",
        "The pain you feel today will be the strength you feel tomorrow.",
        "Believe in yourself and all that you are.",
        "Every workout is progress.",
        "Push yourself because no one else is going to do it for you.",
        "Sweat is fat crying.",
        "Make yourself proud.",
        "You don't have to be extreme, just consistent.",
        "The hardest lift is lifting your butt off the couch."
    ],

    // Set auth manager reference (to avoid circular dependency)
    setAuthManager(manager) {
        AuthManager = manager;
    },

    // Initialize dashboard
    init(user) {
        this.currentUser = user;
        this.updateStats();
        this.setMotivationQuote();
        ChartsManager.initCharts(user);
        this.loadWorkoutsList();
    },

    // Update dashboard statistics
    updateStats() {
        document.getElementById('currentWeight').textContent = this.currentUser.weight.toFixed(1);
        document.getElementById('goalWeight').textContent = this.currentUser.goalWeight.toFixed(1);
        document.getElementById('totalWorkouts').textContent = this.currentUser.workouts.length;
        
        const thisWeekWorkouts = this.currentUser.activityHistory.reduce((a, b) => a + b, 0);
        document.getElementById('weekWorkouts').textContent = thisWeekWorkouts;
    },

    // Set random motivation quote
    setMotivationQuote() {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        document.getElementById('motivationQuote').textContent = randomQuote;
    },

    // Refresh dashboard
    refresh() {
        if (AuthManager) {
            this.currentUser = AuthManager.getCurrentUser();
        }
        this.updateStats();
        ChartsManager.updateCharts(this.currentUser);
        this.loadWorkoutsList();
    },

    // Load workouts list
    loadWorkoutsList() {
        const list = document.getElementById('workoutsList');
        
        if (!this.currentUser.workouts || this.currentUser.workouts.length === 0) {
            list.innerHTML = `
                <div class="empty-state py-5">
                    <i class="bi bi-clipboard-x"></i>
                    <p class="fs-6 mt-3">No workouts saved yet.<br>Create your first workout!</p>
                </div>
            `;
            return;
        }
        
        list.innerHTML = this.currentUser.workouts.map((workout, index) => `
            <div class="workout-item">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <span class="badge bg-success mb-2">#${index + 1}</span>
                        <h6 class="mb-0 fw-bold">${workout.name}</h6>
                    </div>
                    <button class="btn btn-danger btn-sm" data-workout-id="${workout.id}">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
                <p class="mb-1 small">
                    <i class="bi bi-list-ul text-primary me-1"></i>
                    <strong>Exercises:</strong> ${workout.exercises}
                </p>
                ${workout.notes ? `
                    <p class="mb-1 small">
                        <i class="bi bi-journal-text text-warning me-1"></i>
                        <strong>Notes:</strong> ${workout.notes}
                    </p>
                ` : ''}
                <p class="mb-0 small text-muted">
                    <i class="bi bi-calendar3 me-1"></i>
                    ${new Date(workout.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                    })}
                </p>
            </div>
        `).join('');

        // Add delete event listeners
        list.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const workoutId = parseInt(e.target.closest('button').dataset.workoutId);
                this.deleteWorkout(workoutId);
            });
        });
    },

    // Save new workout
    saveWorkout(name, exercises, notes) {
        const workout = {
            id: Date.now(),
            name,
            exercises,
            notes,
            date: new Date().toISOString()
        };
        
        this.currentUser.workouts.push(workout);
        
        // Update activity for today
        const today = new Date().getDay();
        const dayIndex = today === 0 ? 6 : today - 1; // Convert to Mon-Sun
        this.currentUser.activityHistory[dayIndex]++;
        
        // Update storage
        if (AuthManager) {
            AuthManager.updateCurrentUser(this.currentUser);
        } else {
            StorageManager.updateUser(this.currentUser);
        }
        
        // Refresh dashboard
        this.refresh();
        
        return true;
    },

    // Delete workout
    deleteWorkout(workoutId) {
        if (!confirm('Are you sure you want to delete this workout?')) return;
        
        this.currentUser.workouts = this.currentUser.workouts.filter(w => w.id !== workoutId);
        
        // Update storage
        if (AuthManager) {
            AuthManager.updateCurrentUser(this.currentUser);
        } else {
            StorageManager.updateUser(this.currentUser);
        }
        
        // Refresh dashboard
        this.refresh();
    }
};