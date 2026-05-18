const express = require('express');
const app = express();

app.use(express.json());

let activeGames = [];

// 1. POST endpoint: Stores a new game code
app.post('/api/games', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    // Remove existing duplicate entry if the host restarts/re-lists
    activeGames = activeGames.filter(g => g.code !== code);

    // Store code with a timestamp
    activeGames.push({ code, createdAt: Date.now() });

    // Cap the array to prevent memory leaks on the free tier
    if (activeGames.length > 1 /* limits the number of games */) {
        activeGames.shift();
    }

    res.status(201).json({ success: true, message: "Code stored" });
});

// 2. GET endpoint: Retrieves all active game codes
app.get('/api/games', (req, res) => {
    // Clean up codes older than 2 hours
    const expirationTime = Date.now() - (2 * 60 * 60 * 1000);
    activeGames = activeGames.filter(g => g.createdAt > expirationTime);

    res.json({ games: activeGames });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});