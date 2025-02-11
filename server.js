const express = require('express');
const session = require('express-session');
const app = express();

const sessionTimeout = 30 * 60 * 1000; // 30 minutes

// Middleware to check session timeout
function checkSessionTimeout(req, res, next) {
    const currentTime = Date.now();
    const sessionTimestamp = req.session.lastActivity || currentTime;
    
    // If the session has timed out
    if (currentTime - sessionTimestamp > sessionTimeout) {
        // Destroy session and send timeout response
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Error logging out');
            }
            return res.status(401).send('Session expired. Please log in again.');
        });
    } else {
        // Update last activity timestamp
        req.session.lastActivity = currentTime;
        next();
    }
}

// Set up session handling
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Apply session timeout middleware to all routes
app.use(checkSessionTimeout);

// Example route
app.get('/tasks', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }
    // Fetch tasks for the user...
    res.send('Tasks list');
});

// Login route (simplified)
app.post('/login', (req, res) => {
    // Perform login logic...
    req.session.user = { id: 1, username: 'user1' }; // Store user details in session
    req.session.lastActivity = Date.now();
    res.send('Logged in');
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.send('Logged out');
    });
});

// Start server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
