import { useState, useEffect } from 'react'
import Form from './components/Form'
import List from './components/List'
import './App.css'


const STORAGE_KEY = 'crud-items'

function App() {

  const [items, setItems] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const datosGuardados = localStorage.getItem(STORAGE_KEY)
    if (datosGuardados) {
      setItems(JSON.parse(datosGuardados))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])


  function agregarItem(texto) {
    // no permitir agregar cuando esta vacío
    if (texto.trim() === '') {
      setError('No puedes agregar un elemento vacío.')
      return
    }

    
    setError('')

    
    const nuevoItem = {
      id: Date.now(),
      text: texto,
    }

  
    setItems([...items, nuevoItem])
  }


  function actualizarItem(id, texto) {
    if (texto.trim() === '') {
      setError('No puedes dejar el elemento vacío.')
      return
    }

    setError('')

    const listaActualizada = items.map(function (item) {
      if (item.id === id) {
        return { ...item, text: texto }
      } else {
        return item
      }
    })

    setItems(listaActualizada)
    setEditingId(null)
  }

  
  function iniciarEdicion(id) {
    setEditingId(id)
    setError('')
  }


  function cancelarEdicion() {
    setEditingId(null)
    setError('')
  }

  // Pedir confirmación antes de eliminar
  function eliminarItem(id) {
    const usuarioConfirmo = window.confirm('¿Seguro que deseas eliminar este elemento?')

    if (usuarioConfirmo === true) {
      const listaSinEseItem = items.filter(function (item) {
        return item.id !== id
      })
      setItems(listaSinEseItem)
    }
  }


  const itemEditando = items.find(function (item) {
    return item.id === editingId
  })

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">Lista de Tareas</h1>

        <Form
          onAdd={agregarItem}
          onUpdate={actualizarItem}
          editingItem={itemEditando}
          onCancelEdit={cancelarEdicion}
          error={error}
        />

        {/* El Contador */}
        <p className="counter">Total: {items.length}</p>

        <List items={items} onEdit={iniciarEdicion} onDelete={eliminarItem} />
      </div>
    </div>
  )
}

export default App
