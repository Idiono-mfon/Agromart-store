import { useState, useEffect } from "react";
import { instance } from "./index";

const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);

  const getCategories = async () => {
    try {
      const res = await instance.get("/api/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  };
};

export default useCategory;
