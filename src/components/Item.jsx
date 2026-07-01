function Item({ item, onEdit, onDelete, onToggle }) {
  return (
 
    <li className={item.completed ? 'item completed' : 'item'}>
      <label className="item-label">
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />
        <span className="item-text">{item.text}</span>
      </label>

      <div className="item-actions">
        <button className="btn-edit" onClick={() => onEdit(item.id)}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => onDelete(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default Item
