import Product from "../models/ProductModel.js";

class Apifeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    //Excluded keys not necessary in the object
    const excludeFields = ["page", "sort", "limit"];
    excludeFields.forEach((el) => delete queryObj[el]);
    // Query String
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // console.log({ queryStr });
    this.query.find(JSON.parse(queryStr));
    return this; //current object 
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      //   or try this also this.query = this.query.sort(sortBy)
      this.query.sort(sortBy);
    } else {
      this.query.sort({ createdAt: -1 });
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    //(You can also use this) this.query = this.query.skip(skip).limit(limit);
    this.query.skip(skip).limit(limit);
    return this;
  }
}

export const getProducts = async (req, res) => {
  try {
    //   Object initialization and modification of the query object
    const features = new Apifeatures(
      Product.find().populate({ path: "owner", select: "name email" }),
      req.query
    )
      .filtering()
      .sorting()
      .pagination();
    const products = await features.query;
    return res.json({
      status: "success",
      result: products.length,
      products: products,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { product_id, title, price, description, content, images, category } =
      req.body;

    if (!images) return res.status(400).json({ msg: "No image uploaded" });
    const product = await Product.findOne({ product_id });
    if (product)
      return res.status(400).json({ msg: "This product already exists" });
    const newProduct = new Product({
      product_id,
      owner: req.user.id,
      title: title.toLowerCase(),
      price,
      description,
      content,
      images,
      category,
    });
    await newProduct.save();
    return res.json({ msg: "Created a new product" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { title, price, description, content, images, category } = req.body;
    if (!images) return res.status(400).json({ msg: "No image Uploaded" });
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      }
    );

    return res.json({ msg: "Product updated" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    return res.json({ msg: "Product deleted" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
