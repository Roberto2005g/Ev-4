import { useState, useEffect } from 'react'

function Form({ onAdd, onUpdate, editingItem, onCancelEdit, error }) {
  
  const [texto, setTexto] = useState('')

  
  useEffect(() => {
    if (editingItem) {
      setTexto(editingItem.text)
    } else {
      setTexto('')
    }
  }, [editingItem])

  function manejarEnvio(e) {
    e.preventDefault() 

    if (editingItem) {
      
      onUpdate(editingItem.id, texto)
    } else {
      
      onAdd(texto)
    }

    setTexto('')
  }

  function manejarCancelar() {
    setTexto('')
    onCancelEdit()
  }

  return (
    <form className="item-form" onSubmit={manejarEnvio}>
      <input
        type="text"
        className="text-input"
        placeholder="Escribe un elemento..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button type="submit" className="btn-submit">
        {editingItem ? 'Actualizar' : 'Agregar'}
      </button>

      {editingItem && (
        <button type="button" className="btn-cancel" onClick={manejarCancelar}>
          Cancelar
        </button>
      )}

      
      {error && <p className="error-message">{error}</p>}
    </form>
  )
}

export default Form