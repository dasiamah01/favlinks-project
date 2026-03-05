const Table = (props) => {
  // Map through the array to create rows
  const rows = props.linkData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>
          <a href={row.url} target="_blank" rel="noreferrer">{row.url}</a>
        </td>
        <td>
          <button onClick={() => props.removeLink(index)}>Remove</button>
        </td>
      </tr>
    )
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>URL</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

export default Table