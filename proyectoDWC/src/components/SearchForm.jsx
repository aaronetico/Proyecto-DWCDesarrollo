import { useState } from 'react'

function SearchForm({ onSearch }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch({ name }) // solo enviamos nombre
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Escribe el nombre del producto..."
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchForm
