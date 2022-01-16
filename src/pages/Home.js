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
import { ImageWithText } from "../components/ImageWithText";
const Home = () => {
  const { fetchAllProducts, products } = useContext(ShopContext);

  useEffect(() => {
    fetchAllProducts();
    return () => {};
  }, [fetchAllProducts]);

  if (!products) return <div>Loading....</div>;

  return (
    <Box>
      <Hero />
      <RichText
        heading="The relaxation you’ve been waiting for."
        text="Our Bath bombs guarantee a fun, relaxing, and colorful night."
      />

      <ImageWithText
        button
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/premium-bath-bombs.jpg?v=1610066758"
        heading="Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. "
      />
      <ImageWithText
        reverse
        button
        image="https://cdn.shopify.com/s/files/1/0472/5705/9496/files/bath-bomb-and-candle.jpg?v=1610066758"
        heading="Second Heading"
        text="I'm baby kale chips twee skateboard tattooed, DIY iPhone ugh mixtape tumeric unicorn narwhal. Iceland shoreditch authentic, sartorial vegan twee flannel banh mi bushwick retro farm-to-table single-origin coffee. "
      />
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
      <RichText heading="Treat yourself!" />
    </Box>
  );
};

export { Home };
