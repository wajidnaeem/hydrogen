import React, { useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { RichText } from "../components/RichText";

import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Heading,
  Flex,
  Center,
} from "@chakra-ui/react";

const Collection = () => {
  const { handle } = useParams();

  const {
    fetchProductWithHandle,
    addItemtoCheckout,
    product,
    products,
    fetchAllProducts,
    productbyHnadle,
    fetchAllCollections,
    collection,
    fetchCollectionByHandle,
    collectionProducts,
  } = useContext(ShopContext);

  useEffect(() => {
    fetchCollectionByHandle(handle);
  }, [fetchCollectionByHandle, handle]);

  if (!collectionProducts) {
    return <div>....Loading</div>;
  }
  //   console.log("collection products need:: ", collection.products);

  return (
    <Box>
      <Grid templateColumns={["repeat(1fr)", "repeat(3, 1fr)"]}>
        {collectionProducts.map((collectionProducts) => (
          <Link
            to={`/products/${collectionProducts.handle}`}
            key={collectionProducts.id}
          >
            <Box
              boxSize="sm"
              border="1px"
              borderColor="gray.200"
              _hover={{ opacity: "80%" }}
              textAlign="center"
              position="relative"
            >
              <Image src={collectionProducts.images[0].src} />
              <Text fontWeight="bold" position="absolute" bottom="15%" w="100%">
                {collectionProducts.title}
              </Text>
              <Text color="gray.500" position="absolute" bottom="5%" w="100%">
                ${collectionProducts.variants[0].price}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export { Collection };
