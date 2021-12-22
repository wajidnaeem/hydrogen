import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import {
  Box,
  Icon,
  Image,
  Text,
  Flex,
  Grid,
  Heading,
  Button,
} from "@chakra-ui/react";

const ProductPage = () => {
  const { handle } = useParams();

  const {
    fetchProductWithHandle,
    addItemtoCheckout,
    product,
    productbyHnadle,
  } = useContext(ShopContext);

  console.log(
    "fetchProductWithHandle in productpage ::",
    fetchProductWithHandle
  );

  useEffect(() => {
    fetchProductWithHandle(handle);
  }, [fetchProductWithHandle]);

  if (!productbyHnadle.title) {
    return <div>....Loading</div>;
  }

  return (
    console.log("product :: ", productbyHnadle),
    (
      <Box>
        <Grid templateColumns="repeat(2,1fr)">
          <Image src={productbyHnadle.images[0].src} />
          <Box>
            <Heading>{productbyHnadle.title}</Heading>
            <Text>{productbyHnadle.description}</Text>

            <Button
              onClick={() =>
                addItemtoCheckout(productbyHnadle.variants[0].id, 1)
              }
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Box>
    )
  );
};

export { ProductPage };
