import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/userSlice";
import Header from "../../Common/Header/Header";
import {
  postProduct,
  editProduct,
  setAddProductForm,
  setProductImages,
  setEditProductForm,
  setEditProductImages,
  deleteProduct,
} from "../../../redux/slices/adminSlice";
import { fetchSingleProduct } from "../../../redux/slices/userSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector(
    (state) => state.user.allProducts.allProducts
  );
  const productForm = useSelector((state) => state.admin.productForm);
  const [openForm, setOpenForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [ProductIdToEdit, setProductIdToEdit] = useState(null);
  const singleProductData = useSelector((state) => state.user.singleProduct);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpenAddProduct = () => {
    setOpenForm(true);
  };

  const handleCloseAddProduct = () => {
    setOpenForm(false);
  };

  const handleOpenEditProduct = async (Id) => {
    await dispatch(fetchSingleProduct({ id: Id }));
    setOpenEditForm(true);
    setProductIdToEdit(Id);
  };

  console.log(singleProductData);

  const handleCloseEditProduct = () => {
    setOpenEditForm(false);
  };

  const handleProductInput = (e) => {
    dispatch(
      setAddProductForm({ ...productForm, [e.target.id]: e.target.value })
    );
  };

  const handleProductImages = (e) => {
    const files = e.target.files;
    dispatch(setProductImages(files));
    const product = {
      ...productForm,
      product_images: files,
    };
    dispatch(setAddProductForm(product));
  };

  const handleEditProductInput = (e) => {
    dispatch(
      setEditProductForm({ ...productForm, [e.target.id]: e.target.value })
    );
  };

  const handleEditProductImages = (e) => {
    const files = e.target.files;
    dispatch(setEditProductImages(files));
    const product = {
      ...productForm,
      product_images: files,
    };
    dispatch(setEditProductForm(product));
  };

  const submitProduct = async () => {
    const formData = new FormData();
    formData.append("product_name", productForm.product_name);
    formData.append("price", productForm.price);
    formData.append("discount", productForm.discount);
    formData.append("description", productForm.description);
    for (const iterator of productForm.product_images) {
      formData.append("files", iterator);
    }

    try {
      await dispatch(postProduct(formData));
      dispatch(fetchProducts());
      setOpenForm(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const submitEditProduct = async () => {
    const formData = new FormData();
    formData.append("product_name", productForm.product_name);
    formData.append("price", productForm.price);
    formData.append("discount", productForm.discount);
    formData.append("description", productForm.description);
    for (const iterator of productForm.product_images) {
      formData.append("files", iterator);
    }

    try {
      await dispatch(
        editProduct({ productData: formData, id: ProductIdToEdit })
      );
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (Id) => {
    await dispatch(deleteProduct({ id: Id }));
    dispatch(fetchProducts());
  };

  const navigateToSingleProduct = (id) => {
    navigate(`/single_product/${id}`);
  };

  return (
    <>
      <Header />
      <div className="adminProduct_page">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} marginTop={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenAddProduct}
            >
              Add product
            </Button>
          </Grid>
          {allProducts?.map((product, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={index}
              marginTop={3}
              justifyContent="center"
            >
              <Card
                sx={{
                  maxWidth: 345,
                  height: 360,
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  onClick={() => navigateToSingleProduct(product._id)}
                  component="img"
                  height="140"
                  image={`http://localhost:5001/product/uploads/${product.product_image}`}
                  alt=""
                  sx={{
                    height: "60%"
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.product_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ₹{product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Save ₹{product.discount}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between"
            }}>
                <Button
                  variant="contained"
                  onClick={() => handleOpenEditProduct(product._id)}
                >
                  <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="contained">
                  <span
                    className="material-symbols-outlined"
                    onClick={() => handleDelete(product._id)}
                  >
                    delete
                  </span>
                </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog open={openForm} onClose={handleCloseAddProduct}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <TextField
              id="product_name"
              label="Product Name"
              value={productForm.product_name}
              onChange={handleProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="price"
              label="Price"
              value={productForm.price}
              onChange={handleProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="discount"
              label="Discount"
              value={productForm.discount}
              onChange={handleProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              value={productForm.description}
              onChange={handleProductInput}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              id="product_images"
              onChange={handleProductImages}
              accept="image/*"
              multiple
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddProduct} color="primary">
              Cancel
            </Button>
            <Button onClick={submitProduct} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openEditForm} onClose={handleCloseEditProduct}>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogContent>
            <TextField
              id="product_name"
              label="Product Name"
              value={productForm.product_name}
              onChange={handleEditProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="price"
              label="Price"
              value={productForm.price}
              onChange={handleEditProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="discount"
              label="Discount"
              value={productForm.discount}
              onChange={handleEditProductInput}
              fullWidth
              margin="normal"
            />
            <TextField
              id="description"
              label="Description"
              value={productForm.description}
              onChange={handleEditProductInput}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              id="product_images"
              onChange={handleEditProductImages}
              accept="image/*"
              multiple
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditProduct} color="primary">
              Cancel
            </Button>
            <Button onClick={submitEditProduct} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AdminProducts;
