// Authentication Module - Handles user registration and login

const AuthManager = {
    currentUser: null,

    // Initialize authentication
    init() {
        // Check for existing session
        this.currentUser = StorageManager.getCurrentUser();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show appropriate screen
        if (this.currentUser) {
            this.showApp();
        }
    },

    // Setup event listeners
    setupEventListeners() {
        const loginForm = document.getElementById('loginFormElement');
        const registerForm = document.getElementById('registerFormElement');
        const showRegisterLink = document.getElementById('showRegisterLink');
        const showLoginLink = document.getElementById('showLoginLink');
        const logoutBtn = document.getElementById('logoutBtn');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        if (showRegisterLink) {
            showRegisterLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showRegister();
            });
        }

        if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLogin();
            });
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    },

    // Handle login
    handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const users = StorageManager.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            StorageManager.saveCurrentUser(user);
            this.showApp();
        } else {
            alert('Invalid credentials. Please try again.');
        }
    },

    // Handle registration
    handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const weight = parseFloat(document.getElementById('regWeight').value);
        const goalWeight = parseFloat(document.getElementById('regGoalWeight').value);
        
        // Check if email already exists
        if (StorageManager.emailExists(email)) {
            alert('Email already registered. Please login.');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            weight,
            goalWeight,
            workouts: [],
            weightHistory: [{ date: new Date().toISOString(), weight }],
            activityHistory: [0, 0, 0, 0, 0, 0, 0]
        };
        
        StorageManager.addUser(newUser);
        
        alert('Registration successful! Please login.');
        this.showLogin();
        
        // Clear form
        e.target.reset();
    },

    // Show login form
    showLogin() {
        document.getElementById('loginForm').style.display = 'block';
        document.getElementById('registerForm').style.display = 'none';
    },

    // Show register form
    showRegister() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    },

    // Show main app
    showApp() {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('appContainer').classList.add('active');
        document.getElementById('userName').textContent = `Hello, ${this.currentUser.name}`;
        
        // Initialize dashboard
        DashboardManager.init(this.currentUser);
    },

    // Logout
    logout() {
        if (confirm('Are you sure you want to logout?')) {
            StorageManager.clearCurrentUser();
            this.currentUser = null;
            document.getElementById('authContainer').style.display = 'flex';
            document.getElementById('appContainer').classList.remove('active');
            
            // Reset forms
            document.getElementById('loginFormElement').reset();
            this.showLogin();
        }
    },

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    },

    // Update current user
    updateCurrentUser(updatedUser) {
        this.currentUser = updatedUser;
        StorageManager.updateUser(updatedUser);
    }
};