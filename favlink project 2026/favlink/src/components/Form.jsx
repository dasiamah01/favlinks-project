import { useState } from 'react'

const Form = (props) => {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() // Prevents the page from refreshing
    
    // Send the data up to the App.js parent
    props.onNewLink({ name, url })
    
    // Clear the inputs after submission
    setName('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      
      <label>URL</label>
      <input 
        type="text" 
        value={url} 
        onChange={(e) => setUrl(e.target.value)} 
      />
      
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form