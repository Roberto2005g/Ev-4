import Item from './Item'

function List({ items, onEdit, onDelete }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <Item key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}

export default List
