import { useState } from 'react'
import Table from './LinkTable'
import Form from './form'

const LinkContainer = () => {
  // 1. Initialize state as an empty array
  const [favLinks, setFavLinks] = useState([])

  // 2. Logic to handle removing a link (filtered by index)
  const handleRemove = (index) => {
    const updatedLinks = favLinks.filter((_, i) => i !== index)
    setFavLinks(updatedLinks)
  }

  // 3. Logic to handle adding a new link
  const handleSubmit = (favLink) => {
    setFavLinks([...favLinks, favLink])
  }

  return (
    <div className="container">
      <h1>My Favorite Links</h1>
      <p>Add a new link with a name and link to the table.</p>
      
      {/* Pass the data and the delete function to the Table */}
      <Table linkData={favLinks} removeLink={handleRemove} />

      <br />

      <h3>Add New</h3>
      {/* Pass the add function to the Form */}
      <Form onNewLink={handleSubmit} />
    </div>
  )
}

export default LinkContainer