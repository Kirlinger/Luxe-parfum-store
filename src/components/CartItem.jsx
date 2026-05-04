const CartItem = ({ item, onRemove }) => (
  <div className="flex justify-between items-center border-b p-4">
    <div>
      <h2 className="font-semibold">{item.name}</h2>
      <p className="text-gray-600">${item.price.toFixed(2)}</p>
    </div>
    <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
  </div>
);

export default CartItem;
