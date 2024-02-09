import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux/slices/userSlice";
import Header from "../../Common/Header/Header";

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
} from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.user.allProducts.allProducts);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (!products) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  const navigateToSingleProduct = (id) => {
    navigate(`/single_product/${id}`);
  };

  console.log(products);

  return (
    <>
      <Header />
      <Grid container spacing={2} justifyContent="center">
        {products?.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}  marginTop={5}>
            <Card sx={{ maxWidth: 345, padding: "10px" }}
            onClick={() => navigateToSingleProduct(product._id)}
            >
              <CardMedia
                component="img"
                height="140"
                image={`http://localhost:5001/product/uploads/${product.product_image}`}
                alt=""
              />
              <CardContent 
              >
                <Typography gutterBottom variant="h5" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: ₹{product.price}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                  MRP: ₹mrp
                </Typography> */}
                <Typography variant="body2" color="text.secondary">
                  Save ₹{product.discount}
                </Typography>
              </CardContent>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                variant="contained"
              >
                Buy now
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Products;
