import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]); // This fixes the 'undefined' error

  const getProjects = async () => {
    try {
      // This MUST match the /test-db route in your Server.js
      const response = await fetch("http://localhost:5000/test-db");
      const jsonData = await response.json();
      setProjects(jsonData);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>My Project Dashboard</h1>
        <div className="project-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} style={{ border: '2px solid #61dafb', margin: '15px', padding: '20px', borderRadius: '15px', width: '250px' }}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Status:</strong> {project.status}</p>
              </div>
            ))
          ) : (
            <p>No projects found in the database.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App; // This fixes the 'Module has no exports' error