const ProductForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onSubmit({
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      description: formData.get('description'),
      category: formData.get('category'),
      image: formData.get('image'),
    });
    e.target.reset();
  };

  const inputClass = "w-full bg-cream border border-cream-deeper text-charcoal font-sans text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors duration-200 placeholder:text-charcoal-soft";
  const labelClass = "block font-sans text-xs tracking-widest uppercase text-charcoal-soft mb-2 font-medium";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      <div>
        <label className={labelClass}>Product Name</label>
        <input name="name" placeholder="e.g. Noir Absolu" required className={inputClass} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Price (USD)</label>
          <input name="price" placeholder="0.00" type="number" step="0.01" min="0" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select name="category" required className={inputClass}>
            <option value="">Select...</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Description</label>
        <textarea name="description" placeholder="A short description..." required className={`${inputClass} resize-none h-24`} />
      </div>
      <div>
        <label className={labelClass}>Image URL</label>
        <input name="image" placeholder="https://images.unsplash.com/..." required className={inputClass} />
      </div>
      <button
        type="submit"
        className="btn-gold w-full text-center"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;

