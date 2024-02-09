import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCart,
    removeCart,
    fetchProducts
} from "../../../redux/slices/userSlice";


const Cart = () => {
  const [totalPayment, setTotalPayment] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.allCartProducts.allCarts);
//   const orderData = useSelector((state) => state.homeSlice.order);
  const products = useSelector((state) => state.user.allProducts.allProducts)

  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
//   const userId = user._id;

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchProducts());
  }, []);

  const productsInCart = cart && cart.length > 0 ? cart[0].cartDetails : [];

  const handleRemovalFromCart = (index) => {
    // dispatch(removeCart({ index: index }));
    // dispatch(fetchCart({ userId: userId }));
  };



  useEffect(() => {
    let totalAmount = 0;
    productsInCart?.forEach((product) => {
      totalAmount += product.price;
    });
    setTotalPayment(totalAmount);
  }, [productsInCart]);
  
//   console.log("Total Payment:", totalPayment);

  console.log("cart: ",cart);
  console.log("products: ",products);


  return (
    <>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Cart</Typography>
      </Grid>
      <Grid item xs={12}>
        {productsInCart?.map((cartProduct, index) => (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12} md={4}>
              <img
                src={`http://localhost:5001/product/uploads/${cartProduct.product_images?.[0]}`}
                alt=""
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{cartProduct.product_name}</Typography>
              <Typography variant="subtitle1">Price: {cartProduct.price}</Typography>
              <Button onClick={() => handleRemovalFromCart(index)}>Remove</Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center">Total: {totalPayment}</Typography>
      </Grid>
      {/* <Grid item xs={12}>
        <PaymentBtn productsInCart={cart} user={user} totalPrice={totalPayment} />
      </Grid> */}
    </Grid>
    </>
  );
};

export default Cart;
