import React, { useState, useEffect } from 'react';

function ProjectDashboard() {
  const [projects, setProjects] = useState([]);
  const [musicTracks, setMusicTracks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  // Fetch both datasets
  const getAllData = async () => {
    try {
      const pRes = await fetch("http://localhost:5000/projects");
      const mRes = await fetch("http://localhost:5000/music");
      setProjects(await pRes.json());
      setMusicTracks(await mRes.json());
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => { getAllData(); }, []);

  // Handlers
  const handleAddTask = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskInput })
    });
    setTaskInput("");
    getAllData();
  };

  const handleToggle = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await fetch(`http://localhost:5000/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });
    getAllData();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
    getAllData();
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "auto", fontFamily: "sans-serif" }}>
      <h1>Project Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}>
        
        {/* TASK SECTION */}
        <section>
          <h2>My Tasks</h2>
          <form onSubmit={handleAddTask}>
            <input value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="New task..." />
            <button>Add Project</button>
          </form>
          {projects.map(p => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "15px" }}>
              <span onClick={() => handleToggle(p.id, p.status)} style={{ cursor: "pointer", fontSize: "1.2rem" }}>
                {p.status === "completed" ? "✅" : "⬜"}
              </span>
              <span style={{ textDecoration: p.status === "completed" ? "line-through" : "none", flex: 1 }}>
                {p.title}
              </span>
              <button onClick={() => handleDelete(p.id)} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          ))}
        </section>

        {/* MUSIC SECTION */}
        <section>
          <h2>Music Archive</h2>
          {musicTracks.map(track => (
            <div key={track.id} style={{ marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <strong>{track.title}</strong> ({track.genre})<br />
              {track.streaming_link && <a href={track.streaming_link} target="_blank" rel="noreferrer" style={{ color: "#007bff", textDecoration: "none", fontSize: "0.9rem" }}>Listen Now</a>}
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}

export default ProjectDashboard;