import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchSingleProduct,
  addToCart,
  setProductInCart,
} from "../../../redux/slices/userSlice";
import Header from "../../Common/Header/Header";

import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";

const SingleProductView = () => {
  const singleProduct = useSelector(
    (state) => state.user.singleProduct.getSingleProduct
  );
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [indexNo, setIndexNo] = useState(0);

  useEffect(() => {
    dispatch(fetchSingleProduct({ Id: id }));
  }, [dispatch, id]);

  const putToCartHandler = () => {
    dispatch(addToCart(id)); 
};

  return (
    <>
      <Header />
      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={6} md={5} marginTop={5}>
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={`http://localhost:5001/product/uploads/${singleProduct?.product_images?.[indexNo]}`}
              alt=""
              sx={{
                border: "1px solid #e1dcdc",
              }}
            />
            <CardContent>
              <Grid container spacing={2}>
                <Box
                  display="flex"
                  gap={"20px"}
                  marginTop={5}
                  marginRight={5}
                  marginLeft={5}
                >
                  {singleProduct?.product_images &&
                    singleProduct?.product_images?.map((image, index) => {
                      if (index >= 0 && index < 5) {
                        return (
                          <Grid item xs={4} key={index}>
                            <img
                              onMouseOver={() => setIndexNo(index)}
                              src={`http://localhost:5001/product/uploads/${image}`}
                              alt=""
                              style={{
                                width: "100%",
                                cursor: "pointer",
                                border: "1px solid #e1dcdc",
                              }}
                            />
                          </Grid>
                        );
                      }
                    })}
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={5}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Typography variant="h4" gutterBottom>
              {singleProduct?.product_name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {singleProduct?.description}
            </Typography>
            <Typography variant="h5" gutterBottom>
              Total: &#8377;{singleProduct?.price}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Discount: &#8377;{singleProduct?.discount}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => putToCartHandler()}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleProductView;
