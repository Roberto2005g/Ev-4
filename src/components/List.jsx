import Item from './Item'

function List({ items, onEdit, onDelete, onToggle }) {

  if (items.length === 0) {
    return <p className="empty-message">No hay elementos para mostrar.</p>
  }

  return (
    <ul className="item-list">
      {items.map(function (item) {
        return (
          <Item
            key={item.id}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        )
      })}
    </ul>
  )
}

export default List