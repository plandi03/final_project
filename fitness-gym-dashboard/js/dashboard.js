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
        "Push yourself because no one else is going to do it for you."
    ],

    // Initialize dashboard
    init(user) {
        this.currentUser = user;
        this.updateStats();
        this.setMotivationQuote();
        ChartsManager.initCharts(user);
    },

    // Update dashboard statistics
    updateStats() {
        document.getElementById('currentWeight').textContent = this.currentUser.weight;
        document.getElementById('goalWeight').textContent = this.currentUser.goalWeight;
        document.getElementById('totalWorkouts').textContent = this.currentUser.workouts.length;
        
        const thisWeekWorkouts = this.currentUser.activityHistory.reduce((a, b) => a + b, 0);
        document.getElementById('weekWorkouts').textContent = thisWeekWorkouts;
    },

    // Set random motivation quote
    setMotivationQuote() {
        const randomQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)];
        document.getElementById('motivationQuote').textContent = `"${randomQuote}"`;
    },

    // Refresh dashboard
    refresh() {
        this.currentUser = AuthManager.getCurrentUser();
        this.updateStats();
        ChartsManager.updateCharts(this.currentUser);
        this.loadWorkoutsList();
    },

    // Load workouts list
    loadWorkoutsList() {
        const list = document.getElementById('workoutsList');
        
        if (!this.currentUser.workouts || this.currentUser.workouts.length === 0) {
            list.innerHTML = '<p style="color: var(--text-light);">No workouts saved yet. Create your first workout above!</p>';
            return;
        }
        
        list.innerHTML = this.currentUser.workouts.map(workout => `
            <div class="workout-item">
                <h4>${workout.name}</h4>
                <p class="workout-exercises"><strong>Exercises:</strong> ${workout.exercises}</p>
                ${workout.notes ? `<p class="workout-exercises"><strong>Notes:</strong> ${workout.notes}</p>` : ''}
                <p class="workout-exercises"><strong>Date:</strong> ${new Date(workout.date).toLocaleDateString()}</p>
                <button class="delete-btn" data-workout-id="${workout.id}">Delete</button>
            </div>
        `).join('');

        // Add delete event listeners
        list.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const workoutId = parseInt(e.target.dataset.workoutId);
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
        AuthManager.updateCurrentUser(this.currentUser);
        
        // Refresh dashboard
        this.refresh();
        
        return true;
    },

    // Delete workout
    deleteWorkout(workoutId) {
        if (!confirm('Are you sure you want to delete this workout?')) return;
        
        this.currentUser.workouts = this.currentUser.workouts.filter(w => w.id !== workoutId);
        
        // Update storage
        AuthManager.updateCurrentUser(this.currentUser);
        
        // Refresh dashboard
        this.refresh();
    },

    setAuthManager(manager) {
        AuthManager = manager;
    }
};