import { useState, useEffect } from 'react'
import Form from './components/Form'
import List from './components/List'
import './App.css'


const STORAGE_KEY = 'crud-items'

function App() {

  const [items, setItems] = useState(function () {
    const datosGuardados = localStorage.getItem(STORAGE_KEY)
    if (datosGuardados) {
      return JSON.parse(datosGuardados)
    } else {
      return []
    }
  })

  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function agregarItem(texto) {
  
    if (texto.trim() === '') {
      setError('No puedes agregar un elemento vacío.')
      return
    }

    setError('')

    const nuevoItem = {
      id: Date.now(),
      text: texto,
      completed: false,
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

  function eliminarItem(id) {
    const usuarioConfirmo = window.confirm('¿Seguro que deseas eliminar este elemento?')

    if (usuarioConfirmo === true) {
      const listaSinEseItem = items.filter(function (item) {
        return item.id !== id
      })
      setItems(listaSinEseItem)
    }
  }

  function marcarCompletado(id) {
    const listaActualizada = items.map(function (item) {
      if (item.id === id) {
        return { ...item, completed: !item.completed }
      } else {
        return item
      }
    })

    setItems(listaActualizada)
  }

  function borrarTodo() {
    if (items.length === 0) {
      return
    }

    const usuarioConfirmo = window.confirm('¿Seguro que deseas eliminar TODOS los elementos?')

    if (usuarioConfirmo === true) {
      setItems([])
    }
  }

  const itemEditando = items.find(function (item) {
    return item.id === editingId
  })

  const itemsFiltrados = items.filter(function (item) {
    return item.text.toLowerCase().includes(busqueda.toLowerCase())
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

        <div className="toolbar">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <span className="counter">Total: {items.length}</span>
        </div>

        <List
          items={itemsFiltrados}
          onEdit={iniciarEdicion}
          onDelete={eliminarItem}
          onToggle={marcarCompletado}
        />

        <button className="btn-delete-all" onClick={borrarTodo}>
          Borrar todo
        </button>
      </div>
    </div>
  )
}

export default App
