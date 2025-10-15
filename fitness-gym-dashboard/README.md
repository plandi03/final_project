# 🏋️ Fitness & Gym Progress Dashboard

A comprehensive web application for tracking workouts, monitoring fitness progress, and managing nutrition goals.

## 🚀 Features

- **User Authentication** - Secure registration and login system
- **Dashboard** - Visual progress tracking with charts and statistics
- **Exercise Library** - Browse and search exercises by muscle group
- **Nutrition Tracking** - Search meals and view nutritional information
- **Workout Planner** - Create and save custom workout routines
- **Progress Charts** - Visualize weight and activity trends

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- API Keys (for production):
  - [RapidAPI ExerciseDB](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb)
  - [Spoonacular API](https://spoonacular.com/food-api)

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/fitness-gym-dashboard.git
cd fitness-gym-dashboard
```

2. Configure API keys in `config/api-config.js`:
```javascript
const API_CONFIG = {
    exerciseDB: {
        apiKey: 'YOUR_RAPIDAPI_KEY_HERE',
        // ...
    },
    spoonacular: {
        apiKey: 'YOUR_SPOONACULAR_API_KEY_HERE',
    },
    demoMode: false // Set to false when using real APIs
};
```

3. Open `index.html` in your browser or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

4. Navigate to `http://localhost:8000`

## 📁 Project Structure