const express = require('express');
const cors = require('cors');
const pool = require('./Db'); 
const app = express();

app.use(cors());
app.use(express.json());

// --- PRODUCTION TASKS ---
app.get('/projects', async (req, res) => {
    try {
        const allProjects = await pool.query("SELECT * FROM projects ORDER BY id ASC");
        res.json(allProjects.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

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

// --- MUSIC ARCHIVE ---
app.get('/music', async (req, res) => {
    try {
        const allMusic = await pool.query("SELECT * FROM music ORDER BY id DESC");
        res.json(allMusic.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post('/music', async (req, res) => {
    try {
        const { title, genre, link } = req.body;
        const newTrack = await pool.query(
            "INSERT INTO music (title, genre, streaming_link) VALUES($1, $2, $3) RETURNING *",
            [title, genre, link]
        );
        res.json(newTrack.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(5000, () => {
    console.log("🚀 SauceLord Studio Server live on port 5000");
});