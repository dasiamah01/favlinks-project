import { useState } from 'react'
import Form from './components/Form'
import LinkTable from "./components/LinkTable";

function App() {
  const [links, setLinks] = useState([])

  const handleNewLink = (link) => {
    setLinks([...links, link]) // Add new link to the existing list
  }

  const handleRemove = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index)
    setLinks(updatedLinks) // Update state without the deleted item
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and URL to the table.</p>
      <LinkTable linkData={links} removeLink={handleRemove} />
      <br />
      <h3>Add New</h3>
      <Form onNewLink={handleNewLink} />
    </div>
  )
}

export default App