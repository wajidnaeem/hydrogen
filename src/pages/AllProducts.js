import React, { useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { Box, Grid, Image, Text } from "@chakra-ui/react";
import { Hero } from "../components/Hero";
import { RichText } from "../components/RichText";

const AllProducts = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (!products) return <div>Loading....</div>;

  return (
    <Box>
      <RichText heading="All Products!" />
      <Grid templateColumns={["repeat(1fr)", "repeat(3, 1fr)"]}>
        {products.map((product) => (
          <Link to={`/products/${product.handle}`} key={product.id}>
            <Box
              _hover={{ opacity: "80%" }}
              textAlign="center"
              position="relative"
            >
              <Image src={product.images[0].src} />
              <Text fontWeight="bold" position="absolute" bottom="15%" w="100%">
                {product.title}
              </Text>
              <Text color="gray.500" position="absolute" bottom="5%" w="100%">
                ${product.variants[0].price}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export { AllProducts };
