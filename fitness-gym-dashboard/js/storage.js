// Storage Module - Handles all data persistence
// NOTE: Using in-memory storage for demo. Replace with backend in production.

const StorageManager = {
    // In-memory storage as fallback
    memoryStorage: {
        users: [],
        currentUser: null
    },

    // Get all users
    getUsers() {
        try {
            const users = localStorage.getItem('users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.warn('localStorage not available, using memory storage');
            return this.memoryStorage.users;
        }
    },

    // Save users
    saveUsers(users) {
        try {
            localStorage.setItem('users', JSON.stringify(users));
        } catch (error) {
            console.warn('localStorage not available, using memory storage');
            this.memoryStorage.users = users;
        }
    },

    // Get current user
    getCurrentUser() {
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.warn('localStorage not available, using memory storage');
            return this.memoryStorage.currentUser;
        }
    },

    // Save current user
    saveCurrentUser(user) {
        try {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } catch (error) {
            console.warn('localStorage not available, using memory storage');
            this.memoryStorage.currentUser = user;
        }
    },

    // Clear current user
    clearCurrentUser() {
        try {
            localStorage.removeItem('currentUser');
        } catch (error) {
            this.memoryStorage.currentUser = null;
        }
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