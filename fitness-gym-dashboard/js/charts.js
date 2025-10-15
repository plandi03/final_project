// Charts Module - Implements graphs using Chart.js

export const ChartsManager = {
    weightChart: null,
    activityChart: null,

    // Initialize charts
    initCharts(user) {
        this.createWeightChart(user);
        this.createActivityChart(user);
    },

    // Create weight progress chart
    createWeightChart(user) {
        const ctx = document.getElementById('weightChart');
        
        if (!ctx) return;

        const weightData = user.weightHistory.map(h => h.weight);
        const weightLabels = user.weightHistory.map((h, i) => `Week ${i + 1}`);
        
        if (this.weightChart) {
            this.weightChart.destroy();
        }

        this.weightChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: weightLabels,
                datasets: [{
                    label: 'Weight (kg)',
                    data: weightData,
                    borderColor: '#00C896',
                    backgroundColor: 'rgba(0, 200, 150, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    },

    // Create activity chart
    createActivityChart(user) {
        const ctx = document.getElementById('activityChart');
        
        if (!ctx) return;

        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        if (this.activityChart) {
            this.activityChart.destroy();
        }

        this.activityChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Workouts',
                    data: user.activityHistory,
                    backgroundColor: '#00C896'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    },

    // Update charts with new data
    updateCharts(user) {
        if (this.weightChart) {
            const weightData = user.weightHistory.map(h => h.weight);
            const weightLabels = user.weightHistory.map((h, i) => `Week ${i + 1}`);
            
            this.weightChart.data.labels = weightLabels;
            this.weightChart.data.datasets[0].data = weightData;
            this.weightChart.update();
        }

        if (this.activityChart) {
            this.activityChart.data.datasets[0].data = user.activityHistory;
            this.activityChart.update();
        }
    }
};