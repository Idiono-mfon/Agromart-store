import { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { instance } from "../../../api/index";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/Loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description:
    "Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Dt",
  content:
    "Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Dt",
  _id: "",
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoryAPI.categories;
  const [callback, setCallback] = state.productsAPI.callback;
  const [products] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isFarmer] = state.userAPI.isFarmer;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const styleUpload = {
    display: images ? "block" : "none",
  };

  const history = useHistory();

  const param = useParams();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin && !isFarmer) return alert("You are not an admin");
      const file = e.target.files[0];
      if (!file) return alert("File not uploaded");

      if (file.size > 1024 * 1024) return alert("Size too large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("Invalid file");

      let formData = new FormData();

      formData.append("file", file);

      setLoading(true);

      const res = await instance.post("/api/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async (e) => {
    try {
      if (!isAdmin && !isFarmer) return alert("You are not an admin");
      setLoading(true);
      await instance.post("/api/destroy", { public_id: images.public_id });
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!isAdmin && !isFarmer) return alert("You are not an admin");
      if (!images) return alert("No image Uploaded");
      onEdit
        ? await instance.put(`/api/products/${product._id}`, {
            ...product,
            images,
          })
        : await instance.post("/api/products", { ...product, images });

      setLoading(false);
      setCallback(!callback);
      // setImages(false);
      // setProduct(initialState);
      history.push("/");
    } catch (err) {
      alert(err.reponse.data.msg);
    }
  };

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          images && (
            <div id="file_img" style={{ styleUpload }}>
              <img src={images.url} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
          )
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product Id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            value={product.product_id}
            onChange={handleChangeInput}
            disabled={onEdit}
          />
        </div>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            required
            id="price"
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={product.content}
            onChange={handleChangeInput}
            rows="5"
          />
        </div>
        <div className="row">
          <label htmlFor="categories">Categories</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? "Update" : "Create"} product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
