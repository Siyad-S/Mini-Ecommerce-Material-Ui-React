import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const postProduct = createAsyncThunk(
  "postProduct",
  async (productData) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/product",
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "editProduct",
  async ({ productData, id }) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/product/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
    "deleteProduct",
    async ({ id }) => {
      try {
        const response = await axios.delete(
          `http://localhost:5001/product/${id}`
        )
        return response.data;
      } catch (error) {
        console.log(error.message);
      }
    }
  );

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isError: false,
    productForm: {
      product_name: "",
      price: "",
      discount: "",
      description: "",
      product_images: [],
    },
    singleProductData: {}
  },
  reducers: {
    setAddProductForm: (state, action) => {
      state.productForm = { ...action.payload };
    },
    setProductImages: (state, action) => {
      state.productForm.product_images = { ...action.payload };
    },
    setEditProductForm: (state, action) => {
      state.productForm = { ...action.payload };
    },
    setEditProductImages: (state, action) => {
      state.productForm.product_images = { ...action.payload };
    },
    setSingleProductData: (state, action) => {
        state.singleProductData = { ...action.payload };
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProduct.fulfilled, (state, action) => {
        state.productForm = { ...action.payload };
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.productForm = { ...action.payload };
      })
      .addCase(postProduct.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occured on posting of product");
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isError = true;
        console.log("Error occured on editting of product");
      })
  },
});

export const {
  setAddProductForm,
  setProductImages,
  setEditProductForm,
  setEditProductImages,
  setSingleProductData
} = adminSlice.actions;

export default adminSlice.reducer;
