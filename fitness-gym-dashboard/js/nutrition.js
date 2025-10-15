// Nutrition Module - Handles Spoonacular API data

const NutritionManager = {
    meals: [],

    // Initialize nutrition module
    init() {
        this.setupEventListeners();
    },

    // Setup event listeners
    setupEventListeners() {
        const searchBtn = document.getElementById('searchMealsBtn');
        const searchInput = document.getElementById('mealSearch');

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
    },

    // Search for meals
    async searchMeals() {
        const searchTerm = document.getElementById('mealSearch').value;

        if (!searchTerm) {
            alert('Please enter a search term');
            return;
        }

        const grid = document.getElementById('mealGrid');
        grid.innerHTML = '<div class="loading">Searching meals...</div>';

        try {
            if (API_CONFIG.demoMode) {
                // Use demo data
                this.meals = this.getDemoMeals(searchTerm);
                this.displayMeals(this.meals);
            } else {
                // Fetch from Spoonacular API
                const response = await fetch(
                    `${API_CONFIG.spoonacular.baseUrl}/recipes/complexSearch?query=${searchTerm}&number=12&addRecipeNutrition=true&apiKey=${API_CONFIG.spoonacular.apiKey}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch meals');
                }

                const data = await response.json();
                this.meals = data.results.map(meal => ({
                    title: meal.title,
                    image: meal.image,
                    calories: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Calories')?.amount || 0),
                    protein: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Protein')?.amount || 0),
                    carbs: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Carbohydrates')?.amount || 0),
                    fat: Math.round(meal.nutrition?.nutrients?.find(n => n.name === 'Fat')?.amount || 0)
                }));
                
                this.displayMeals(this.meals);
            }
        } catch (error) {
            console.error('Error searching meals:', error);
            grid.innerHTML = '<div class="loading">Error loading meals. Please try again.</div>';
        }
    },

    // Get demo meals
    getDemoMeals(searchTerm) {
        return [
            {
                title: `Grilled ${searchTerm} Salad`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Chicken+Salad',
                calories: 350,
                protein: 45,
                carbs: 20,
                fat: 12
            },
            {
                title: `${searchTerm} Protein Bowl`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Protein+Bowl',
                calories: 420,
                protein: 38,
                carbs: 45,
                fat: 15
            },
            {
                title: `Healthy ${searchTerm} Wrap`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Healthy+Wrap',
                calories: 380,
                protein: 32,
                carbs: 42,
                fat: 14
            },
            {
                title: `${searchTerm} Smoothie Bowl`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Smoothie+Bowl',
                calories: 280,
                protein: 25,
                carbs: 35,
                fat: 8
            },
            {
                title: `Baked ${searchTerm} with Quinoa`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Quinoa+Bowl',
                calories: 520,
                protein: 40,
                carbs: 50,
                fat: 18
            },
            {
                title: `${searchTerm} Stir Fry`,
                image: 'https://via.placeholder.com/400x300/1E1E2F/00C896?text=Stir+Fry',
                calories: 390,
                protein: 35,
                carbs: 38,
                fat: 16
            }
        ];
    },

    // Display meals
    displayMeals(meals) {
        const grid = document.getElementById('mealGrid');

        if (meals.length === 0) {
            grid.innerHTML = '<div class="loading">No meals found</div>';
            return;
        }

        grid.innerHTML = meals.map(meal => `
            <div class="meal-card">
                <img src="${meal.image}" alt="${meal.title}" class="meal-image">
                <div class="meal-info">
                    <h3>${meal.title}</h3>
                    <div class="nutrition-facts">
                        <div class="nutrition-item">
                            <strong>${meal.calories}</strong>
                            <span>Calories</span>
                        </div>
                        <div class="nutrition-item">
                            <strong>${meal.protein}g</strong>
                            <span>Protein</span>
                        </div>
                        <div class="nutrition-item">
                            <strong>${meal.carbs}g</strong>
                            <span>Carbs</span>
                        </div>
                        <div class="nutrition-item">
                            <strong>${meal.fat}g</strong>
                            <span>Fat</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
};