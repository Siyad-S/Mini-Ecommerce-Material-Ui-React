import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
    "fetchProducts", async () => {
        try {
            const response = await axios.get("http://localhost:5001/product");
            return response.data;
        } catch(error) {
            console.log(error)
            throw error;
        }
    }
)

export const fetchSingleProduct = createAsyncThunk(
    "fetchSingleProduct", async ({Id}) => {
        try {
            const response = await axios.get(`http://localhost:5001/product/${Id}`);
            return response.data
        } catch(error) {
            throw error;
        }
    }
)

export const fetchCart = createAsyncThunk(
    "fetchCart", async () => {
        try {
            const response = await axios.get(`http://localhost:5001/cart`);
            return response.data
        } catch(error) {
            throw error;
        }
    }
)

export const removeCart = createAsyncThunk(
    "removeCart", async ({Id}) => {
        try {
            const response = await axios.delete(`http://localhost:5001/cart/${Id}`);
            return response.data
        } catch(error) {
            throw error;
        }
    }
)

export const addToCart = createAsyncThunk(
    "addToCart", async (productId) => {
        try {
            const response = await axios.post(`http://localhost:5001/cart`, { product_id: productId });
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);



export const userSlice = createSlice({
  name: 'user',
  initialState : {
    isError: false,
    singleProduct: {},
    allProducts: [],
    allCartProducts: [],
    cartForm: {
        product_id : ""
    }
  },
  reducers: {
    setProductInCart: (state, action) => {
        state.cartForm.product_id = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload;
    })
    .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
        state.allCartProducts = action.payload;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on fetchProducts");
    })
    .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on fetchSingleProduct");
    })
    .addCase(fetchCart.rejected, (state, action) => {
        state.isError = true;
        console.log("Error on fetching of cart products");
    })
  }

})


export const { setProductInCart } = userSlice.actions

export default userSlice.reducer