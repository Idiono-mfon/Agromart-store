import { useState, useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import { instance } from "../../../api/index";
const Categories = () => {
  const state = useContext(GlobalState);
  const [categories, setCategories] = state.categoryAPI.categories;
  const [category, setCategory] = useState("");
  const [callback, setCallback] = state.categoryAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const res = onEdit
        ? await instance.put(`/api/category/${id}`, { name: category })
        : await instance.post("/api/category", { name: category });
      alert(res.data.msg);

      setOnEdit(false);
      setCategory("");
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const editCategory = async (id, name) => {
    setId(id);
    setCategory(name);
    setOnEdit(true);
  };

  const deleteCategory = async (id) => {
    try {
      const res = await instance.delete(`/api/category/${id}`);
      alert(res.data.msg);
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="categories">
      <form onSubmit={createCategory}>
        <label htmlFor="category">Add Category</label>
        <input
          type="text"
          name="category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">{onEdit ? "Update" : "Submit"}</button>
      </form>

      <div className="col">
        {categories.map((category) => (
          <div className="row" key={category._id}>
            <p>{category.name}</p>
            <div>
              <button onClick={() => editCategory(category._id, category.name)}>
                Edit
              </button>
              <button onClick={() => deleteCategory(category._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
