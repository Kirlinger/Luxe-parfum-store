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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
      <input name="name" placeholder="Product Name" required className="mb-2 p-2 border rounded" />
      <input name="price" placeholder="Price" type="number" step="0.01" min="0" required className="mb-2 p-2 border rounded" />
      <textarea name="description" placeholder="Description" required className="mb-2 p-2 border rounded" />
      <input name="category" placeholder="Category" required className="mb-2 p-2 border rounded" />
      <input name="image" placeholder="Image URL" required className="mb-2 p-2 border rounded" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Add Product</button>
    </form>
  );
};

export default ProductForm;
