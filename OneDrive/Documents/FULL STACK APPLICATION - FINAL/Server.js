const express = require('express');
const cors = require('cors');
const pool = require('./Db');
const app = express();

app.use(cors());
app.use(express.json());

// Projects
app.get('/projects', async (req, res) => {
    try {
        const all = await pool.query("SELECT * FROM projects ORDER BY id ASC");
        res.json(all.rows);
    } catch (err) { console.error(err.message); }
});

app.post('/projects', async (req, res) => {
    try {
        const { title } = req.body;
        const add = await pool.query("INSERT INTO projects (title, status) VALUES($1, 'pending') RETURNING *", [title]);
        res.json(add.rows[0]);
    } catch (err) { console.error(err.message); }
});

app.delete('/projects/:id', async (req, res) => {
    try {
        await pool.query("DELETE FROM projects WHERE id = $1", [req.params.id]);
        res.json("Deleted!");
    } catch (err) { console.error(err.message); }
});

// Music
app.get('/music', async (req, res) => {
    try {
        const all = await pool.query("SELECT * FROM music ORDER BY id DESC");
        res.json(all.rows);
    } catch (err) { console.error(err.message); }
});

app.post('/music', async (req, res) => {
    try {
        const { title, genre, streaming_link } = req.body;
        const add = await pool.query("INSERT INTO music (title, genre, streaming_link) VALUES($1, $2, $3) RETURNING *", [title, genre, streaming_link]);
        res.json(add.rows[0]);
    } catch (err) { console.error(err.message); }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));