function Item({ item, onEdit, onDelete }) {
  return (
    <li className="item">
      <span className="item-text">{item.text}</span>

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
