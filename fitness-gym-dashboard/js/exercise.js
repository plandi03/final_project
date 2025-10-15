// Exercise Module - Handles ExerciseDB API data
import { API_CONFIG } from '../config/api-config.js';

export const ExerciseManager = {
    // ... (keep all existing code, but update displayExercises for Bootstrap)
    
    exercises: [],
    filteredExercises: [],
    
    // Initialize exercise module
    init() {
        this.setupEventListeners();
    },
    
    // Setup event listeners
    setupEventListeners() {
        const loadBtn = document.getElementById('loadExercisesBtn');
        const muscleFilter = document.getElementById('muscleFilter');
        const searchInput = document.getElementById('searchExercise');
    
        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.loadExercises());
        }
    
        if (muscleFilter) {
            muscleFilter.addEventListener('change', () => this.filterExercises());
        }
    
        if (searchInput) {
            searchInput.addEventListener('input', () => this.filterExercises());
        }
    },
    
    // Load exercises from API or demo data
    async loadExercises() {
        const grid = document.getElementById('exerciseGrid');
        grid.innerHTML = '<div class="loading">Loading exercises...</div>';
    
        try {
            if (API_CONFIG.demoMode) {
                // Use demo data
                this.exercises = this.getDemoExercises();
                this.filteredExercises = [...this.exercises];
                this.displayExercises(this.filteredExercises);
            } else {
                // Fetch from ExerciseDB API
                const response = await fetch(`${API_CONFIG.exerciseDB.baseUrl}/exercises`, {
                    method: 'GET',
                    headers: API_CONFIG.exerciseDB.headers
                });
    
                if (!response.ok) {
                    throw new Error('Failed to fetch exercises');
                }
    
                const data = await response.json();
                this.exercises = data;
                this.filteredExercises = [...this.exercises];
                this.displayExercises(this.filteredExercises);
            }
        } catch (error) {
            console.error('Error loading exercises:', error);
            grid.innerHTML = '<div class="loading">Error loading exercises. Please try again.</div>';
        }
    },
    
    // Get demo exercises
    getDemoExercises() {
        return [
            {
                name: 'Bench Press',
                bodyPart: 'chest',
                equipment: 'barbell',
                target: 'pectorals',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Bench+Press'
            },
            {
                name: 'Squats',
                bodyPart: 'legs',
                equipment: 'barbell',
                target: 'quadriceps',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Squats'
            },
            {
                name: 'Deadlift',
                bodyPart: 'back',
                equipment: 'barbell',
                target: 'spine',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Deadlift'
            },
            {
                name: 'Shoulder Press',
                bodyPart: 'shoulders',
                equipment: 'dumbbell',
                target: 'deltoids',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Shoulder+Press'
            },
            {
                name: 'Bicep Curls',
                bodyPart: 'arms',
                equipment: 'dumbbell',
                target: 'biceps',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Bicep+Curls'
            },
            {
                name: 'Pull Ups',
                bodyPart: 'back',
                equipment: 'body weight',
                target: 'lats',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Pull+Ups'
            },
            {
                name: 'Lunges',
                bodyPart: 'legs',
                equipment: 'body weight',
                target: 'glutes',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Lunges'
            },
            {
                name: 'Tricep Dips',
                bodyPart: 'arms',
                equipment: 'body weight',
                target: 'triceps',
                gifUrl: 'https://via.placeholder.com/300x200/1E1E2F/00C896?text=Tricep+Dips'
            }
        ];
    },
    
    // Filter exercises
    filterExercises() {
        const muscleFilter = document.getElementById('muscleFilter').value.toLowerCase();
        const searchTerm = document.getElementById('searchExercise').value.toLowerCase();
    
        this.filteredExercises = this.exercises.filter(ex => {
            const matchesMuscle = !muscleFilter || ex.bodyPart.toLowerCase().includes(muscleFilter);
            const matchesSearch = !searchTerm || ex.name.toLowerCase().includes(searchTerm);
            return matchesMuscle && matchesSearch;
        });
    
        this.displayExercises(this.filteredExercises);
    },
    
    // Display exercises
    // Removed duplicate definition of displayExercises
    displayExercises(exercises) {
        const grid = document.getElementById('exerciseGrid');

        if (exercises.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted py-5">No exercises found</div>';
            return;
        }

        grid.innerHTML = exercises.map(ex => `
            <div class="col-md-4 col-lg-3">
                <div class="card h-100 shadow-sm">
                    <img src="${ex.gifUrl}" alt="${ex.name}" class="card-img-top exercise-card-img">
                    <div class="card-body">
                        <h5 class="card-title">${ex.name}</h5>
                        <div class="d-flex gap-2">
                            <span class="badge bg-success">${ex.bodyPart}</span>
                            <span class="badge bg-primary">${ex.equipment}</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};
