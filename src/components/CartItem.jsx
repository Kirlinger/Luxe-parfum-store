const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <div className="flex gap-4 py-6 border-b border-cream-dark">
    <div className="w-24 h-28 flex-shrink-0 overflow-hidden">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-charcoal-soft mb-1">
              {item.category}
            </p>
            <h3 className="font-serif text-lg text-charcoal font-medium leading-tight">
              {item.name}
            </h3>
            {item.size && (
              <p className="font-sans text-xs text-charcoal-soft mt-1">{item.size}</p>
            )}
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-charcoal-soft hover:text-charcoal transition-colors duration-200 ml-4 flex-shrink-0"
            aria-label="Remove item"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        {/* Quantity */}
        <div className="flex items-center border border-cream-deeper">
          <button
            onClick={() => onQuantityChange && onQuantityChange(item.id, Math.max(1, (item.quantity || 1) - 1))}
            className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors duration-150 font-sans text-sm"
          >
            −
          </button>
          <span className="w-8 h-8 flex items-center justify-center font-sans text-sm text-charcoal">
            {item.quantity || 1}
          </span>
          <button
            onClick={() => onQuantityChange && onQuantityChange(item.id, (item.quantity || 1) + 1)}
            className="w-8 h-8 flex items-center justify-center text-charcoal hover:bg-cream-dark transition-colors duration-150 font-sans text-sm"
          >
            +
          </button>
        </div>
        <span className="font-serif text-lg font-medium text-charcoal">
          ${(item.price * (item.quantity || 1)).toFixed(2)}
        </span>
      </div>
    </div>
  </div>
);

export default CartItem;

