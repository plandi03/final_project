// Storage Module - Handles all data persistence with fallback

export const StorageManager = {
    // In-memory storage as fallback
    memoryStorage: {
        users: [],
        currentUser: null
    },

    // Check if localStorage is available
    isLocalStorageAvailable() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    // Get all users
    getUsers() {
        if (this.isLocalStorageAvailable()) {
            try {
                const users = localStorage.getItem('users');
                return users ? JSON.parse(users) : [];
            } catch (error) {
                console.warn('Error reading from localStorage:', error);
            }
        }
        return this.memoryStorage.users;
    },

    // Save users
    saveUsers(users) {
        if (this.isLocalStorageAvailable()) {
            try {
                localStorage.setItem('users', JSON.stringify(users));
                return;
            } catch (error) {
                console.warn('Error writing to localStorage:', error);
            }
        }
        this.memoryStorage.users = users;
    },

    // Get current user
    getCurrentUser() {
        if (this.isLocalStorageAvailable()) {
            try {
                const user = localStorage.getItem('currentUser');
                return user ? JSON.parse(user) : null;
            } catch (error) {
                console.warn('Error reading from localStorage:', error);
            }
        }
        return this.memoryStorage.currentUser;
    },

    // Save current user
    saveCurrentUser(user) {
        if (this.isLocalStorageAvailable()) {
            try {
                localStorage.setItem('currentUser', JSON.stringify(user));
                return;
            } catch (error) {
                console.warn('Error writing to localStorage:', error);
            }
        }
        this.memoryStorage.currentUser = user;
    },

    // Clear current user
    clearCurrentUser() {
        if (this.isLocalStorageAvailable()) {
            try {
                localStorage.removeItem('currentUser');
                return;
            } catch (error) {
                console.warn('Error removing from localStorage:', error);
            }
        }
        this.memoryStorage.currentUser = null;
    },

    // Update user in storage
    updateUser(updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        
        if (index !== -1) {
            users[index] = updatedUser;
            this.saveUsers(users);
            this.saveCurrentUser(updatedUser);
            return true;
        }
        return false;
    },

    // Add new user
    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        this.saveUsers(users);
    },

    // Check if email exists
    emailExists(email) {
        const users = this.getUsers();
        return users.some(u => u.email === email);
    }
};