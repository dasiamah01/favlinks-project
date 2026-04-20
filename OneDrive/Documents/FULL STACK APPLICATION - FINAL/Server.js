const express = require('express');
const cors = require('cors');
const pool = require('./Db'); // Connects to your database configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- PROJECT ROUTES ---

// Get all projects
app.get('/projects', async (req, res) => {
    try {
        const allProjects = await pool.query("SELECT * FROM projects ORDER BY id ASC");
        res.json(allProjects.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Create a new project
app.post('/projects', async (req, res) => {
    try {
        const { title } = req.body;
        const newProject = await pool.query(
            "INSERT INTO projects (title, status) VALUES($1, $2) RETURNING *",
            [title, 'pending']
        );
        res.json(newProject.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update project status (for your checkmarks)
app.put('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        await pool.query("UPDATE projects SET status = $1 WHERE id = $2", [status, id]);
        res.json("Status updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// Delete a project
app.delete('/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM projects WHERE id = $1", [id]);
        res.json("Project deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

// --- MUSIC ROUTES ---

// Get all music
app.get('/music', async (req, res) => {
    try {
        const allMusic = await pool.query("SELECT * FROM music ORDER BY id DESC");
        res.json(allMusic.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Add a new track (as seen in your recent terminal commands)
app.post('/music', async (req, res) => {
    try {
        const { title, genre, streaming_link } = req.body;
        const newTrack = await pool.query(
            "INSERT INTO music (title, genre, streaming_link) VALUES($1, $2, $3) RETURNING *",
            [title, genre, streaming_link]
        );
        res.json(newTrack.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("🚀 Server is live on port 5000");
});