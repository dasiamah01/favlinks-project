import React, { useState, useEffect } from 'react';
import './App.css'; // Import the new theme

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [musicTracks, setMusicTracks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [trackTitle, setTrackTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [link, setLink] = useState("");

  const fetchData = async () => {
    try {
      const projRes = await fetch("http://localhost:5000/projects");
      const musicRes = await fetch("http://localhost:5000/music");
      setProjects(await projRes.json());
      setMusicTracks(await musicRes.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskTitle })
    });
    setTaskTitle("");
    fetchData();
  };

  const deleteProject = async (id) => {
    await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
    fetchData();
  };

  const addMusic = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/music", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trackTitle, genre, streaming_link: link })
    });
    setTrackTitle(""); setGenre(""); setLink("");
    fetchData();
  };

  return (
    <div className="dashboard-container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>SauceLord Dashboard</h1>
        <p>Managing Code & Culture</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* TASK SECTION */}
        <div className="section-card">
          <h2>Project Tracker</h2>
          <form onSubmit={addTask} style={{ display: 'flex', gap: '10px' }}>
            <input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="New project..." />
            <button type="submit">Add</button>
          </form>
          {projects.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
              <span>{p.title}</span>
              <button className="delete-btn" onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* MUSIC SECTION */}
        <div className="section-card">
          <h2>Music Archive</h2>
          <form onSubmit={addMusic} style={{ display: 'flex', flexDirection: 'column' }}>
            <input value={trackTitle} onChange={e => setTrackTitle(e.target.value)} placeholder="Song Title" />
            <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" />
            <input value={link} onChange={e => setLink(e.target.value)} placeholder="Link" />
            <button type="submit">Upload Track</button>
          </form>
          {musicTracks.map(track => (
            <div key={track.id} style={{ marginTop: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
              <strong>{track.title}</strong> <small>({track.genre})</small><br/>
              <a href={track.streaming_link} style={{ color: '#00d2ff' }} target="_blank" rel="noreferrer">Listen Now</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectDashboard;