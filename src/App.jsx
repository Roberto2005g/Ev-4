import { useState, useEffect } from 'react'
import Form from './components/Form'
import List from './components/List'
import './App.css'

const STORAGE_KEY = 'crud-items'

function App() {
  const [items, setItems] = useState([])
  const [editingId, setEditingId] = useState(null)

  
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (text) => {
    const newItem = {
      id: Date.now(),
      text: text,
    }
    setItems((prev) => [...prev, newItem])
  }

  const updateItem = (id, text) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: text } : item))
    )
    setEditingId(null)
  }

  const startEdit = (id) => {
    setEditingId(id)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
    if (editingId === id) setEditingId(null)
  }

  const editingItem = items.find((item) => item.id === editingId) || null

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Crud Con LocalStorage</h1>

        <Form
          onAdd={addItem}
          onUpdate={updateItem}
          editingItem={editingItem}
          onCancelEdit={cancelEdit}
        />

        <List items={items} onEdit={startEdit} onDelete={deleteItem} />
      </div>
    </div>
  )
}

export default App
