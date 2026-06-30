import { useState, useEffect } from 'react'

function Form({ onAdd, onUpdate, editingItem, onCancelEdit }) {
  const [text, setText] = useState('')


  useEffect(() => {
    if (editingItem) {
      setText(editingItem.text)
    } else {
      setText('')
    }
  }, [editingItem])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingItem) {
      onUpdate(editingItem.id, text)
    } else {
      onAdd(text)
    }
    setText('')
  }

  const handleCancel = () => {
    setText('')
    onCancelEdit()
  }

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="text-input"
        placeholder="Escribe un elemento..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="btn-submit">
        {editingItem ? 'Actualizar' : 'Agregar'}
      </button>
      {editingItem && (
        <button type="button" className="btn-cancel" onClick={handleCancel}>
          Cancelar
        </button>
      )}
    </form>
  )
}

export default Form