// Nutrition Module - Handles Spoonacular API data
import { API_CONFIG } from '../config/api-config.js';

export const NutritionManager = {
    meals: [],

    // Initialize nutrition module
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        const searchBtn = document.getElementById('searchMealsBtn');
        const searchInput = document.getElementById('mealSearch');
        const tryBtn = document.getElementById('tryRecipesApiBtn');
        const docsQueryInput = document.getElementById('docsQuery');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.searchMeals());
        }

        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.searchMeals();
                }
            });
        }

        // Docs "Try It" button
        if (tryBtn) {
            tryBtn.addEventListener('click', () => {
                const term = (document.getElementById('docsQuery')?.value || '').trim();
                this.searchMealsWithTerm(term, 'docsResultGrid');
            });
        }

        if (docsQueryInput) {
            docsQueryInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const term = (e.currentTarget?.value || '').trim();
                    this.searchMealsWithTerm(term, 'docsResultGrid');
                }
            });
        }
    },

    // Search for meals using default inputs
    async searchMeals() {
        const searchTerm = document.getElementById('mealSearch').value;
        await this.searchMealsWithTerm(searchTerm, 'mealGrid');
    },

    // Core search function used by both Nutrition and Docs sections
    async searchMealsWithTerm(searchTerm, targetGridId = 'mealGrid') {
        const term = (searchTerm || '').trim();

        if (!term) {
            alert('Please enter a search term');
            return;
        }

        const grid = document.getElementById(targetGridId);
        if (grid) {
            grid.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-3 text-muted">Searching for delicious meals...</p>
                </div>
            `;
        }

        try {
            if (API_CONFIG.demoMode) {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 800));
                this.meals = this.getDemoMeals(term);
                this.displayMeals(this.meals, targetGridId);
            } else {
                // Fetch from Spoonacular API
                const response = await fetch(
                    `${API_CONFIG.spoonacular.baseUrl}/recipes/complexSearch?query=${encodeURIComponent(term)}&number=12&addRecipeNutrition=true&apiKey=${API_CONFIG.spoonacular.apiKey}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch meals');
                }

                const data = await response.json();
                this.meals = (data.results || []).map(meal => ({
                    title: meal.title,
                    image: meal.image,
                    calories: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0),
                    protein: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0),
                    carbs: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 0),
                    fat: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 0)
                }));

                this.displayMeals(this.meals, targetGridId);
            }
        } catch (error) {
            console.error('Error searching meals:', error);
            if (grid) {
                grid.innerHTML = `
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">
                            <i class="bi bi-exclamation-triangle me-2"></i>
                            Error loading meals. Please try again.
                        </div>
                    </div>
                `;
            }
        }
    },

    // Get demo meals
    getDemoMeals(searchTerm) {
        return [
            {
                title: `Grilled ${searchTerm} Salad`,
                image: 'https://via.placeholder.com/400x300/00C896/ffffff?text=Healthy+Salad',
                calories: 350,
                protein: 45,
                carbs: 20,
                fat: 12
            },
            {
                title: `${searchTerm} Protein Bowl`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/ffffff?text=Protein+Bowl',
                calories: 420,
                protein: 38,
                carbs: 45,
                fat: 15
            },
            {
                title: `Healthy ${searchTerm} Wrap`,
                image: 'https://via.placeholder.com/400x300/00C896/ffffff?text=Fresh+Wrap',
                calories: 380,
                protein: 32,
                carbs: 42,
                fat: 14
            },
            {
                title: `${searchTerm} Smoothie Bowl`,
                image: 'https://via.placeholder.com/400x300/FF6B6B/ffffff?text=Smoothie+Bowl',
                calories: 280,
                protein: 25,
                carbs: 35,
                fat: 8
            },
            {
                title: `Baked ${searchTerm} with Quinoa`,
                image: 'https://via.placeholder.com/400x300/4ECDC4/ffffff?text=Quinoa+Bowl',
                calories: 520,
                protein: 40,
                carbs: 50,
                fat: 18
            },
            {
                title: `${searchTerm} Stir Fry`,
                image: 'https://via.placeholder.com/400x300/FFE66D/333333?text=Stir+Fry',
                calories: 390,
                protein: 35,
                carbs: 38,
                fat: 16
            }
        ];
    },

    // Display meals
    displayMeals(meals, targetGridId = 'mealGrid') {
        const grid = document.getElementById(targetGridId);

        if (meals.length === 0) {
            grid.innerHTML = `
                <div class="col-12 empty-state">
                    <i class="bi bi-emoji-frown"></i>
                    <p class="fs-5">No meals found. Try a different search term.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = meals.map(meal => `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 border-0 shadow-sm">
                    <img src="${meal.image}" alt="${meal.title}" class="card-img-top meal-card-img">
                    <div class="card-body">
                        <h5 class="card-title fw-bold mb-3">${meal.title}</h5>
                        <div class="row text-center g-2">
                            <div class="col-3">
                                <div class="p-2 rounded bg-success-subtle">
                                    <strong class="text-success d-block fs-5">${meal.calories}</strong>
                                    <small class="text-muted">Cal</small>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2 rounded bg-primary-subtle">
                                    <strong class="text-primary d-block fs-5">${meal.protein}g</strong>
                                    <small class="text-muted">Protein</small>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2 rounded bg-warning-subtle">
                                    <strong class="text-warning d-block fs-5">${meal.carbs}g</strong>
                                    <small class="text-muted">Carbs</small>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="p-2 rounded bg-danger-subtle">
                                    <strong class="text-danger d-block fs-5">${meal.fat}g</strong>
                                    <small class="text-muted">Fat</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};